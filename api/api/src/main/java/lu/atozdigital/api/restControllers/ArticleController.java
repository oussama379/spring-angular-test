package lu.atozdigital.api.restControllers;

import lu.atozdigital.api.dtos.ArticleDto;
import lu.atozdigital.api.services.ArticleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@Transactional
@CrossOrigin("*")
public class ArticleController {
    private ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @PostMapping("/article")
    public ArticleDto createArticle(@ModelAttribute ArticleDto articleDto) throws IOException {
        articleDto.setPicture(articleDto.getPictureIn().getBytes());
        return articleService.createArticle(articleDto);
    }

    @GetMapping("article/{id}")
    public ResponseEntity getArticleById(@PathVariable Long id){
        ArticleDto articleDto = articleService.fetchArticleById(id);
        if(articleDto != null)
            return new ResponseEntity<>(articleDto, HttpStatus.OK);
        else {
            return new ResponseEntity<>("Article Not Found", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("article")
    public List<ArticleDto> getAllArticles(){
        return articleService.fetchAllArticles();
    }
}
