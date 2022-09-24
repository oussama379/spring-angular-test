package lu.atozdigital.api.services;

import lu.atozdigital.api.dtos.OrderDto;
import lu.atozdigital.api.mappers.DtoMapper;
import lu.atozdigital.api.models.Article;
import lu.atozdigital.api.models.Order;
import lu.atozdigital.api.repos.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImp implements OrderService{

    private final OrderRepository orderRepository;
    private final DtoMapper dtoMapper;


    public OrderServiceImp(OrderRepository orderRepository, DtoMapper dtoMapper) {
        this.orderRepository = orderRepository;
        this.dtoMapper = dtoMapper;
    }


    @Override
    public OrderDto createOrder(OrderDto orderDto) throws IOException {
        Order order = dtoMapper.fromOrderDto(orderDto);
        return dtoMapper.fromOrder(orderRepository.save(order));
    }

    @Override
    public List<OrderDto> fetchAllOrders() {
        List<Order> orders = orderRepository.findAll();
        if(orders != null)
            return orders.stream().map(dtoMapper::fromOrder).collect(Collectors.toList());
        else
            return Collections.emptyList();
    }

    @Override
    public OrderDto editOrder(Long id_order, OrderDto orderDto) {
        if(orderRepository.existsById(id_order)){
            orderDto.setId(id_order);
            orderRepository.save(dtoMapper.fromOrderDto(orderDto));
            return dtoMapper.fromOrder(orderRepository.save(dtoMapper.fromOrderDto(orderDto)));
        }
        else
            return null;
    }
}
