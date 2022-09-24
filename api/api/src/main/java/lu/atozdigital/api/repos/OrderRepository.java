package lu.atozdigital.api.repos;

import lu.atozdigital.api.models.Article;
import lu.atozdigital.api.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
