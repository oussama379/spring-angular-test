package lu.atozdigital.api.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lu.atozdigital.api.models.Article;


import java.util.Date;
import java.util.List;

public class OrderDto {
    private Long id;
    private String reference;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date date;
    private List<ArticleDto> articles;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public List<ArticleDto> getArticles() {
        return articles;
    }

    public void setArticles(List<ArticleDto> articles) {
        this.articles = articles;
    }

    @Override
    public String toString() {
        return "OrderDto{" +
                "id=" + id +
                ", reference='" + reference + '\'' +
                ", date=" + date +
                '}';
    }
}
