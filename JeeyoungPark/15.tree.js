// AVL트리
// :스스로 균형을 잡는 이진검색
// :높이를 최소로 유지하며 검색, 삽입, 삭제 연산의 시간 복잡도 O(log(n))을 보장한다.

function AVLTree(value) {
    this.left = null;
    this.right = null;
    this.value = value;
    this.depth = 1;
}

// 자식의 높이를 기반으로 함
AVLTree.prototype.setDepthBasedOnChildren = () => {
    if (this.node == null) {
        this.depth = 1;
    }

    if (this.left != null) {
        this.depth = this.left.depth + 1;
    }

    if (this.right != null && this.depth <= this.right.depth) {
        this.depth = this.right.depth + 1;
    }
}

// 단일 회전
// :삽입 이후에 균형을 유지하기 위해 자식들을 회전한다.
// :오른쪽 노드가 길면 왼쪽으로 회전
// :왼쪽 노드가 길면 오른쪽으로 회전

// Left Rotate
AVLTree.prototype.leftRotate = () => {
    let prevValue = this.value; // 40
    let prevLeft = this.left; // null
    this.value = this.right.value; // 45오른쪽 자식을 현재 값으로

    this.left = this.right; // 45
    this.right = this.right.right; // 47

    this.left.right = this.left.left; // null
    this.left.left = prevLeft; // null
    this.left.value = prevValue; // 40
}

// Right Rotate
AVLTree.prototype.rightRotate = () => {
    let prevValue = this.value;
    let prevLeft = this.left;
    this.left = this.left.right;
    this.left.right = this.value;

}

// 한 번 회전 후에도 불균형이면 두번 회전함.

// 트리 균형 잡기
// : 왼쪽과 오른쪽 자식의 높이 비교 -> 다르면 -> 회전
AVLTree.prototype.balance = () => {
    let leftDepth = this.left == null ? 0 : this.left.depth;
    let rightDepth = this.right == null ? 0 : this.right.depth;

    if (leftDepth > rightDepth + 1) {
        // LR or LL 회전
    } else if (leftDepth + 1 < rightDepth) {
        // RR or RL 회전
    }
}