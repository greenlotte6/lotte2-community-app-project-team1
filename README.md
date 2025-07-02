# lotte2-community-app-project-team1
# 🏢 롯데정보통신 사내 커뮤니티 게시판 사이트 개발 프로젝트

## 📌 프로젝트 주제  

자바, 스프링 활용 롯데정보통신 사내 커뮤니티 게시판 사이트 개발
  (Front Office, Back Office, API 서버)

<br>

  
## 📋 프로젝트 개요  

### 📎 배경  

본 프로젝트는 커뮤니티 사이트 구현을 통해 커뮤니티 사이트의 도메인 지식 함양과 SI 프로젝트 실무 역량을 제공하는 것을 목표로 한다.


### 🎯 목표  

1. 본 프로젝트는 커뮤니티 사이트를 구성하는 주요 요소들의 설계 및 구현을 목표로 한다.
2. 이를 이용하는 사용자, 관리자는 부여된 권한에 따른 메뉴 구성 및 기능을 제공 받아야 한다.
3. React, SCSS, tailwindcss 등의 라이브러리(혹은 프레임워크)를 통한 Component Based UI의 활용을 통해 유지보수가 용이하고, 확장성 있는 프로젝트 환경을 구축한다.


### 👥 사용 대상  
- 일반 사용자  
- 관리자  


<br>

## ✅ 필수 구현 기능  

### 🔧 Back Office (BO)  

랜딩페이지 : 기능 소개, 요금제 설명, 지원 기능 구현(문의)
문의하기 : 문의하기 기능 
관리자 회원 : 요금제 결제를 통해 회사 관리자 계정을 생성
사원 회원 : 관리자 사원 초대 기능
페이지 : 노션을 오마주하여 만든 기능.  
프로젝트 : 작업명, 작업 내용, 직업 우선순위, 담당자 선택 기능
채팅 : 채팅방 생성 및 채팅 기능
드라이브 : 폴더를 생성, 삭제, 이동, 다운로드, 압축 등 
캘린더 : 개인 캘린더, 공유 캘린더 기능과 일정 등록, 수정, 삭제
설정 : 프로필, 비밀번호, 개인정보 수정
게시판 : 회사별 생성된 게시판의 게시글, 댓글 등의 관리 기능 구현

<br>

  
### 💻 Front Office (FO)  

회원 : Jwt, Spring Security를 기반으로 한 인증/인가 기능 구현
게시판 : BO를 통해 등록된 게시판의 표출 기능 및 페이징 처리,게시글, 댓글 등록 기능 구현
검색 : 키워드를 통한 검색 기능의 구현
멤버쉽 : 결제를 통해 유료 기능(유료 게시판 조회) 구현
고객센터 : 1:1문의를 할 수 있는 페이지 구현

<br>

  
### 🔗 API 서버  

BO, FO를 지원하는 API 서버 구현 

<br>

  
## ➕ 추가 구현 기능  

### 🔧 Back Office (BO)  


<br>

  
### 💻 Front Office (FO)  

<br>

  
## 🧾 산출물 (Outputs)  

- 아키텍처 설계 문서
- 시스템 구성도, S/W Stack, 사용한 라이브러리 정보
- API 정의서
- Front Office, Back Office 화면 별 스토리보드
- 테스트 시나리오 및 결과서

<br>

  
## 🛠️ 사용 기술 스택  

| 영역 | 기술 |
|------|------|
| **API 서버** | SpringBoot (Java 기반) |
| **인프라** | AWS EC2, AWS S3, Docker |
| **데이터베이스** | MySQL, MongoDB, Redis |
| **개발 환경** | SPA, MSA 구조 |
| **배포 환경** | Vercel, GitLab |

<br>

  
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
