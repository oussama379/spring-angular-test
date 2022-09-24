package lu.atozdigital.api.mappers;

import lu.atozdigital.api.dtos.ArticleDto;
import lu.atozdigital.api.dtos.OrderDto;
import lu.atozdigital.api.models.Article;
import lu.atozdigital.api.models.Order;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class DtoMapper {

    public ArticleDto fromArticle(Article article) {
        ArticleDto articleDto = new ArticleDto();
        BeanUtils.copyProperties(article, articleDto);
        return articleDto;
    }

    public Article fromArticleDto(ArticleDto articleDto) {
        Article article = new Article();
        BeanUtils.copyProperties(articleDto, article);
        return article;
    }

    public OrderDto fromOrder(Order order) {
        OrderDto orderDto = new OrderDto();
        BeanUtils.copyProperties(order, orderDto);
        orderDto.setArticles(order.getArticles().stream().map(this::fromArticle).collect(Collectors.toList()));
        return orderDto;
    }

    public Order fromOrderDto(OrderDto orderDto) {
        Order order = new Order();
        BeanUtils.copyProperties(orderDto, order);
        order.setArticles(orderDto.getArticles().stream().map(this::fromArticleDto).collect(Collectors.toList()));
        return order;
    }
}
