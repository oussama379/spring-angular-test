package lu.atozdigital.api.restControllers;

import lu.atozdigital.api.dtos.OrderDto;
import lu.atozdigital.api.services.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;


@RestController
@Transactional
@CrossOrigin("*")
public class OrderController {

    private OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("order")
    public List<OrderDto> getAllOrders(){
        return orderService.fetchAllOrders();
    }

    @PostMapping("/order")
    public OrderDto createOrder(@RequestBody OrderDto orderDto) throws IOException {
        return orderService.createOrder(orderDto);
    }

    @PutMapping("order/{id}")
    public ResponseEntity editOrder(@PathVariable Long id, @RequestBody OrderDto orderDto){
        OrderDto order = orderService.editOrder(id, orderDto);
        if(order != null)
            return new ResponseEntity<>(orderDto, HttpStatus.OK);
        else {
            return new ResponseEntity<>("Order Not Found", HttpStatus.BAD_REQUEST);
        }
    }


}
