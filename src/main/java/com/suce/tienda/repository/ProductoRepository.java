package com.suce.tienda.repository;

import com.suce.tienda.domain.Producto;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Integer> {

    public List<Producto> findByActivoTrue();

    // Consulta derivada: productos dentro de un rango de precios
    public List<Producto> findByPrecioBetweenOrderByPrecioAsc(
            double precioInf, double precioSup);

    // Consulta JPQL: productos dentro de un rango de precios
    @Query("SELECT p FROM Producto p "
            + "WHERE p.precio BETWEEN :precioInf AND :precioSup "
            + "ORDER BY p.precio ASC")
    public List<Producto> consultaJPQL(
            @Param("precioInf") double precioInf,
            @Param("precioSup") double precioSup);

    // Consulta SQL nativa: productos dentro de un rango de precios
    @Query(value = "SELECT * FROM producto p "
            + "WHERE p.precio BETWEEN :precioInf AND :precioSup "
            + "ORDER BY p.precio ASC", nativeQuery = true)
    public List<Producto> consultaSQL(
            @Param("precioInf") double precioInf,
            @Param("precioSup") double precioSup);

    // Consulta ampliada: productos activos con existencias bajas
    // Incluye su categoría y ordena por existencias y descripción
    @Query("SELECT p FROM Producto p "
            + "JOIN FETCH p.categoria "
            + "WHERE p.existencias <= :limite "
            + "AND p.activo = true "
            + "ORDER BY p.existencias ASC, p.descripcion ASC")
    public List<Producto> consultaStockBajo(
            @Param("limite") Integer limite);
}