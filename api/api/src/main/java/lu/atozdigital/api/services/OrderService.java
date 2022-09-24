package lu.atozdigital.api.services;

import lu.atozdigital.api.dtos.ArticleDto;
import lu.atozdigital.api.dtos.OrderDto;

import java.io.IOException;
import java.util.List;

public interface OrderService {
    OrderDto createOrder(OrderDto orderDto) throws IOException;
    List<OrderDto> fetchAllOrders();
    OrderDto editOrder(Long id_order, OrderDto orderDto);

}
