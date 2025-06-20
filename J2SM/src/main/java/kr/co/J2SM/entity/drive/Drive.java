package kr.co.J2SM.entity.drive;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "drive")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Drive {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String user;
    private String name;
    private String type; // "file" 또는 "folder"
    private String location;
    private LocalDateTime uploadedAt;
    private boolean favorite;
    private String fileType;
    private String filePath;
    private String originalFilename;

    private boolean deleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Drive parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private java.util.List<Drive> children = new java.util.ArrayList<>();

    @Column(name = "sort_order")
    private Integer sortOrder;
}
