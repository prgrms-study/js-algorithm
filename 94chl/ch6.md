# JS 객체

## JS 객체 속성

객체 생성 : `{}`, `new Object()`
속성 접근: `object.propertyName`, `object[propertyName]`

## 프로토타입 활용 상속?

JS의 유일한 상속 방법
`.prototype` 속성을 사용하여 함수의 이름을 지정하여 Object 속성을 동적으로 확장

## `[[Prototype]]`

JS의 객체가진 숨김 프로퍼티(읽기 전용)
-> 해당 값은 `null` 혹은 다른 객체 참조
-> 다른 객체를 참조하는 경우 참조 대상이 **프로토타입**

## 프로토타입 상속?

객체에서 프로퍼티를 읽으려 할때, 해당 프로퍼티가 없으면 자동으로 프로토타입에서 찾음
-> 프로토타입 설정방법: **proto**
-> `[[Prototype]]`용 `getter`, `setter` (옛날 방식)
-> 최신 `Object.getPrototypeOf`. `Object.setPrototypeOf`

## 생성자와 변수

클래스의 변수 = 해당 클래스 객체의 속성
-> this.propertyName으로 모든 속성 접근 가능

## `getter`, `setter`

지역 변수를 선언한 다음 해당 변수에 대한 접근을 허용가능
-> 해당 생성자의 범위 내에서만 사용가능
(속성 이름 앞에 `getter`는 get을, `setter`는 set을 붙임)
