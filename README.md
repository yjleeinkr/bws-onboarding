# bws-onboarding

## 기본 동작

1. 신규 TodoList 추가
2. 추가된 TodoList의 완료 - 미완료 처리
3. 추가된 TodoList의 삭제

## 필수 사항

- ES6 문법을 사용해서 개발
- ES Module을 사용해서 컴포넌트 형태로 구현
- Web Storage를 사용해 TodoList 데이터 관리

## 선택 사항

- 드래그&드랍으로 Todo List 순서 변경 기능 추가
- 필터링 기능 ( 전부, 완료, 미완료 )
- 인라인 수정기능 ( 추가된 TodoList 더블클릭시 수정 가능하도록 )

---

## How ?

1. `state`가 변경되면 화면을 리렌더링한다.
2. `state`는 무조건 setter함수인 `setState` 로만 변경해야한다.

### 코어 컴포넌트를 만들어서 가져다 쓰기

- 생성자 인자: 해당 컴포넌트를 어디에 붙일지 타겟 지정: `$targetEl`
- 상태값: `state`
- 상태 변경하는 함수: `setState`
- 처음 상태를 초기화하는 세팅함수: `initiate`
- 요소를 그려주는 함수: `createTemplate`
- `$targetEl`에 템플릿을 붙여주는 함수: `render`
