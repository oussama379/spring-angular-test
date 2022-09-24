package lu.atozdigital.api.dtos;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Lob;

public class ArticleDto {
    private Long id;
    private String name;
    private double price;
    @Lob
    private byte[] picture;
    private MultipartFile pictureIn;



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public byte[] getPicture() {
        return picture;
    }

    public void setPicture(byte[] picture) {
        this.picture = picture;
    }

    public MultipartFile getPictureIn() {
        return pictureIn;
    }

    public void setPictureIn(MultipartFile pictureIn) {
        this.pictureIn = pictureIn;
    }
}
