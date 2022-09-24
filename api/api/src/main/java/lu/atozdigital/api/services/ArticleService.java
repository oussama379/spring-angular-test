package lu.atozdigital.api.services;

import lu.atozdigital.api.dtos.ArticleDto;

import java.util.List;

public interface ArticleService {
    ArticleDto createArticle(ArticleDto articleDto);
    ArticleDto fetchArticleById(Long id_article);
    List<ArticleDto> fetchAllArticles();
}
