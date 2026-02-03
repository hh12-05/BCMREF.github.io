# Project EF (Endfield Farming Guide) 개발 계획

이 문서는 Endfield 게임의 무기 적성(Aptitude) 파밍을 효율적으로 돕기 위한 웹 애플리케이션 개발 계획입니다.

## 1. 프로젝트 개요
*   **목표**: 유저가 선택한 무기나 속성에 맞춰 최적의 파밍 장소를 추천하고, 지역별 정보를 제공하는 직관적인 가이드 제공.
*   **핵심 가치**: 사용자 친화적인 UI, 강력한 필터링/정렬 기능, "Endfield" 게임 분위기를 살린 몰입감 있는 디자인.

## 2. 기능 명세 (Feature Specifications)

### A. 핵심 기능 (Core Features)
1.  **파밍 계산기 (Farming Calculator)**
    *   **입력 모드**:
        *   **무기 기반**: 사용자가 보유/목표 무기를 선택.
        *   **속성 기반**: 사용자가 필요한 속성(Attribute)을 선택.
    *   **추천 로직**: 선택된 항목에 필요한 '적성'을 드랍하는 지역을 찾고 효율성 순으로 정렬.
    *   **결과 표시**:
        *   지역별 그룹화.
        *   우선순위 정렬: 해당 지역에서 파밍 가능한 적성 종류가 많은 순서.

2.  **지역 정보 탭 (Region Info)**
    *   각 지역별 드랍 가능한 모든 적성 및 추천 무기 리스트 제공.
    *   지도 혹은 카드 형태로 시각화.

3.  **데이터 필터링 및 정렬**
    *   무기 검색 (이름, 타입, 희귀도).
    *   속성 필터링.

### B. UI/UX 디자인 (Design Aesthetics)
*   **테마**: Endfield 게임의 Industrial Sci-Fi 분위기 (Dark Mode, Sleek borders, Neon Accents).
*   **인터랙션**: 부드러운 호버 효과, 필터 적용 시 실시간 리스트 업데이트 애니메이션.
*   **반응형**: 데스크탑 및 모바일 지원.

## 3. 기술 스택 (Tech Stack)
*   **Structure**: HTML5 (Semantic)
*   **Styling**: Vanilla CSS (CSS Variables for theming, Flexbox/Grid)
*   **Logic**: Vanilla JavaScript (ES6+)
*   **Data**: JSON 포맷의 데이터 파일 (weapons, locations) - *초기에는 스크립트 내 하드코딩 또는 별도 js 파일로 관리하여 로컬 실행 용이성 확보.*

## 4. 구현 단계 (Implementation Phases)

### Phase 1: 기반 구축 (Foundation)
*   전체 레이아웃 설계 (Header, Navigation, Main Content).
*   디자인 시스템 구축 (Color Palette, Typography, Common Components).
*   `index.html`, `style.css`, `app.js` 파일 생성.

### Phase 2: 데이터 구조화 (Data Modeling)
*   무기(Weapons), 속성(Attributes), 지역(Locations), 적성(Aptitudes) 간의 관계 정의.
*   Mock Data 생성 (개발 및 테스트용).

### Phase 3: 핵심 로직 개발 (Core Logic)
*   선택 알고리즘 구현 (무기/속성 -> 지역 매핑).
*   정렬 알고리즘 구현 (효율성 점수 계산).

### Phase 4: UI 연동 및 고도화 (UI Integration)
*   계산기 인터페이스 구현 (Multi-select UI).
*   결과 카드(Result Card) 디자인 및 렌더링.
*   지역 정보 탭 구현.

### Phase 5: 최종 점검 및 최적화 (Polishing)
*   애니메이션 효과 추가.
*   반응형 디자인 테스트.
*   SEO 태그 및 메타데이터 적용.

## 5. 데이터 필요 사항
*   현재 프로젝트 디렉토리가 비어 있습니다. 개발을 진행하며 **무기 목록**과 **지역별 드랍 테이블** 데이터가 필요합니다. 초기에는 가상의 데이터로 구조를 잡겠습니다.
