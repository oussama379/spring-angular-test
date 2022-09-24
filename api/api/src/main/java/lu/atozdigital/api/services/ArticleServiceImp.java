package lu.atozdigital.api.services;

import lu.atozdigital.api.dtos.ArticleDto;
import lu.atozdigital.api.mappers.DtoMapper;
import lu.atozdigital.api.models.Article;
import lu.atozdigital.api.repos.ArticleRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static java.nio.file.Files.copy;
import static java.nio.file.Paths.get;

@Service
public class ArticleServiceImp implements ArticleService{

    private ArticleRepository articleRepository;
    private DtoMapper dtoMapper;

    public ArticleServiceImp(ArticleRepository articleRepository, DtoMapper dtoMapper) {
        this.articleRepository = articleRepository;
        this.dtoMapper = dtoMapper;
    }


    @Override
    public ArticleDto createArticle(ArticleDto articleDto) {
        Article article = dtoMapper.fromArticleDto(articleDto);
        articleRepository.save(article);
        return dtoMapper.fromArticle(articleRepository.save(article));
    }

    @Override
    public ArticleDto fetchArticleById(Long id_article) {
        if(articleRepository.existsById(id_article))
            return dtoMapper.fromArticle(articleRepository.findById(id_article).orElse(null));
        else
            return null;
    }

    @Override
    public List<ArticleDto> fetchAllArticles() {
        List<Article> articles = articleRepository.findAll();
        if(articles != null)
            return articles.stream().map(dtoMapper::fromArticle).collect(Collectors.toList());
        else
            return Collections.emptyList();
    }

}


