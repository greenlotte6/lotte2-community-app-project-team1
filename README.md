# 🏢 J2SM (2조)

롯데정보통신 사내 커뮤니티 게시판 사이트 개발 프로젝트

---

## 📌 프로젝트 소개

**Java & Spring 기반 사내 커뮤니티 시스템 개발**  
- Front Office, Back Office, API 서버 구성  
- 실무형 SI 프로젝트 경험과 도메인 이해를 목표로 수행

---

## 📋 프로젝트 개요

### 📎 배경
사내 커뮤니티 시스템 구현을 통해 게시판 기반 서비스 구조를 이해하고, 실무에 적용 가능한 SI 프로젝트 수행 능력을 향상시키는 것이 목표입니다.

### 🎯 목표
- 커뮤니티 사이트의 핵심 기능 설계 및 구현
- 사용자/관리자 권한에 따른 기능 제공
- React, SCSS, TailwindCSS를 활용한 컴포넌트 기반 UI 구성

### 👥 대상
- 일반 사용자 (사원)
- 관리자 (기업 대표 계정)

---

## ✅ 주요 기능

### 🔧 Back Office (BO)

- **랜딩페이지**: 서비스 소개, 요금제 안내, 문의 기능
- **문의하기**: 1:1 문의 등록
- **관리자 회원**: 요금제 결제를 통한 관리자 계정 생성
- **사원 회원**: 관리자 초대 기능
- **페이지**: 노션을 오마주한 업무 문서 기능
- **프로젝트**: 작업명, 내용, 우선순위, 담당자 지정
- **채팅**: 채팅방 생성 및 실시간 채팅 기능
- **드라이브**: 폴더 생성, 삭제, 이동, 다운로드, 압축
- **캘린더**: 개인/공유 캘린더 및 일정 관리
- **설정**: 프로필, 비밀번호, 개인정보 수정
- **게시판**: 게시글/댓글 관리, 통계 기능

### 💻 Front Office (FO)

- **회원 인증/인가**: JWT + Spring Security 기반
- **게시판**: 게시글 목록, 상세보기, 페이징, 댓글
- **검색**: 키워드 기반 검색
- **멤버십**: 결제 기반 유료 기능 이용
- **고객센터**: 1:1 문의 등록 페이지

### 🔗 API 서버

- BO와 FO를 위한 RESTful API 서버
- Spring Security 기반 인증 처리

---

## 🧾 산출물 (Deliverables)

- 시스템 아키텍처 설계서
- 시스템 구성도 / S/W Stack / 라이브러리 문서
- API 명세서 (Swagger 기반)
- BO & FO 기능 스토리보드
- 테스트 시나리오 및 결과 보고서

---

## 🛠 사용 기술 스택

| 구분         | 기술                                                    |
|--------------|---------------------------------------------------------|
| API 서버     | Spring Boot (Java)                                      |
| 인프라       | AWS EC2, AWS S3, Docker                                 |
| 데이터베이스 | MySQL, MongoDB, Redis                                   |
| 프론트엔드   | React, SCSS, TailwindCSS                                |
| 구조/아키텍처| SPA, MSA 구조                                           |
| 배포         | Vercel (FE), GitLab CI/CD (BE)

---

## 👨‍👩‍👧‍👦 팀원 소개  
<table style="width: 500px;">
  <thead>
    <tr>
      <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;역할&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
      <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;이름&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;팀장&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;김준서&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
    </tr>
    <tr>
      <td rowspan='3'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;팀원&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;우상호&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
    </tr>
    <tr>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;박정원&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
    </tr>
    <tr>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;장민혁&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
    </tr>
  </tbody>
</table>


---

## 🔗 관련 링크

- 🔗 GitHub Repository: [lotte2-community-app-project-team1](https://github.com/greenlotte6/lotte2-community-app-project-team1)
- 🎬 [시연 영상 보기]([https://www.youtube.com/watch?v=jYgzeDvy4DM](https://www.youtube.com/watch?v=WkWGYTKDvhs]))
- 📘 Notion 문서 https://chhak0503.notion.site/21a7537e85eb80aeaf96ccca0071ffa8?source=copy_link
