# 빅오 표기법

해당 알고리즘이 얼마나 효율적인지 나타내는 척도

- `O(1)`  
  상수시간 (입력 공간 변화x)  
  ex) 배열을 인덱스로 접근
- `O(n)`  
  선형 시간 복잡도 (최악: n번의 연산)  
  ex) 0부터 n-1까지 출력
- `O(n**n)`  
  n차 시간 복잡도  
  ex) 반복문 n번 중첩
- `O(log n)`  
  로그 시간 복잡도  
  ex) 2의 2승부터 n승까지 출력  
  ![](https://images.velog.io/images/94chl/post/5c7e6af2-5fa5-4b0f-a085-d03d6eeb960e/image.png)  


## 빅오 표기법 규칙

- `f(n)` : 알고리즘의 시간 복잡도
- `n` : 입력의 개수
- `f(n)time` : 필요한 시간
- `f(n)space` : 필요한 공간(추가 메모리)

### 계수 법칙

입력 크기 n과 관련되지 않은 계수(상수)는 무시  
ex) 상수 `k > 0`일 때, `f(n) = O(g(n))`이면 `k*f(n) = O(g(n))`이다.

### 합의 법칙

시간 복잡도는 더할 수 있다  
ex) `f(n) = O(h(n))`이고 `g(n) = O(p(n))`이면,
`f(n)+g(n) = O(h(n)+p(n))`이다.

### 곱의 법칙

시간 복잡도는 곱할 수 있다  
ex) `f(n) = O(h(n))`이고 `g(n) = O(p(n))`이면,  
`f(n)*g(n) = O(h(n)*p(n))`이다.

### 교환 법칙

동일한 시간 복잡도는 동일한 빅오 표기법을 지닌다  
ex) `f(n) = O(g(n))`이고 `g(n) = O(h(n))`이면,  
`f(n) = O(h(n))`이다.

### 다항 법칙

다항 시간 복잡도가 동일한 다항 차수의 빅오 표기법을 지닌다  
ex) `f(n)`이 `k`차 다항식이면, `f(n)`은 `O(n**k)`이다.
