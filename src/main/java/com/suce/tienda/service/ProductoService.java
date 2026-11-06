package com.suce.tienda.service;

import com.suce.tienda.domain.Producto;
import com.suce.tienda.repository.ProductoRepository;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;
    private final FirebaseStorageService firebaseStorageService;

    public ProductoService(
            ProductoRepository productoRepository,
            FirebaseStorageService firebaseStorageService) {

        this.productoRepository = productoRepository;
        this.firebaseStorageService = firebaseStorageService;
    }

    @Transactional(readOnly = true)
    public List<Producto> getProductos(boolean activo) {

        if (activo) {
            return productoRepository.findByActivoTrue();
        }

        return productoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Producto> getProducto(Integer idProducto) {
        return productoRepository.findById(idProducto);
    }

    @Transactional
    public void save(Producto producto, MultipartFile imagenFile) {

        producto = productoRepository.save(producto);

        if (imagenFile != null && !imagenFile.isEmpty()) {
            try {
                String rutaImagen = firebaseStorageService.uploadImage(
                        imagenFile,
                        "producto",
                        producto.getIdProducto());

                producto.setRutaImagen(rutaImagen);
                productoRepository.save(producto);

            } catch (IOException e) {
                throw new IllegalStateException(
                        "No se pudo guardar la imagen del producto.", e);
            }
        }
    }

    @Transactional
    public void delete(Integer idProducto) {

        if (!productoRepository.existsById(idProducto)) {
            throw new IllegalArgumentException(
                    "El producto con ID " + idProducto + " no existe.");
        }

        try {
            productoRepository.deleteById(idProducto);

        } catch (DataIntegrityViolationException e) {
            throw new IllegalStateException(
                    "No se puede eliminar el producto. Tiene datos asociados.", e);
        }
    }

    // Consulta derivada
    @Transactional(readOnly = true)
    public List<Producto> consultaDerivada(
            double precioInf, double precioSup) {

        return productoRepository.findByPrecioBetweenOrderByPrecioAsc(
                precioInf, precioSup);
    }

    // Consulta JPQL
    @Transactional(readOnly = true)
    public List<Producto> consultaJPQL(
            double precioInf, double precioSup) {

        return productoRepository.consultaJPQL(precioInf, precioSup);
    }

    // Consulta SQL nativa
    @Transactional(readOnly = true)
    public List<Producto> consultaSQL(
            double precioInf, double precioSup) {

        return productoRepository.consultaSQL(precioInf, precioSup);
    }

    // Nueva consulta ampliada: productos con stock bajo
    @Transactional(readOnly = true)
    public List<Producto> consultaStockBajo(Integer limite) {

        return productoRepository.consultaStockBajo(limite);
    }
}