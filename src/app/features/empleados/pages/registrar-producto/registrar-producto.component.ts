import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../../core/services/producto.service';
import { CategoriaService } from '../../../../core/services/categoria.service';
import { UploadService } from '../../../../core/services/upload.service';
import { Categoria } from '../../../../core/models/Categoria';
import { CrearProductoRequest } from '../../../../core/models/requests/CrearProductoRequest';
import { SelectModule } from 'primeng/select';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputText, InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";

@Component({
  selector: 'app-registrar-producto',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectModule, CardModule, ButtonModule, InputTextModule, TableModule],
  templateUrl: './registrar-producto.component.html',
  styleUrl: './registrar-producto.component.css'
})
export class RegistrarProductoComponent implements OnInit {
  private uploadService = inject(UploadService);
  private categoriaService = inject(CategoriaService);
  private productoService = inject(ProductoService);

  nombre = '';
  descripcion = '';
  precio!: number;
  estado: boolean = true;
  categoria?: Categoria;

  file?: File;

  categorias: Categoria[] = [];
  categoriasDropdown: { label: string; value: number }[] = []; // Opciones para el dropdown
  categoriaSeleccionadaId: number | null = null;

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoriaService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data;

        // Transformar categorías al formato esperado por p-select
        this.categoriasDropdown = this.categorias.map((c) => ({
          label: c.nombre,
          value: c.idCategoria,
        }));
      },
      error: (e) => {
        console.error('Error al cargar categorías:', e);
      },
    });
  }

  onFile(event: any) {
    this.file = event.target.files[0];
  }

  // Crear producto
  async crear() {
    try {
      if (!this.categoriaSeleccionadaId) {
        alert('Debe seleccionar una categoría');
        return;
      }

      let urlImagen = '';

      // 1. Subida de imagen (si existe)
      if (this.file) {
        const signed = await this.uploadService
          .getSignedUrl(this.file.name, this.file.type)
          .toPromise();

        await this.uploadService.uploadToGcs(signed.uploadUrl, this.file);

        urlImagen = signed.publicUrl;
      }

      // 2. Payload correcto para backend
      const productoPayload: CrearProductoRequest = {
        nombre: this.nombre,
        descripcion: this.descripcion,
        precio: this.precio,
        imagen: urlImagen,
        estado: this.estado,
        categoria: { idCategoria: this.categoriaSeleccionadaId }
      };

      // 3. Crear producto en backend
      this.productoService.crearProducto(productoPayload).subscribe({
        next: () => alert('Producto creado correctamente'),
        error: (err) => {
          console.error(err);
          alert('Error al crear producto');
        }
      });

    } catch (error) {
      console.error(error);
      alert('Error subiendo imagen o creando producto');
    }
  }
}
