const key = {
    // ASCII KEY Index
    A: 65,
    D: 68,
    SPACE: 32,
}

const isKeyUp = {
    // 스페이스를 계속 누르고 있어도 점프가 되지 않도록 해야합니다.
    // A 또는 D 가 입력되면 반대 방향으로 이동하면 안됩니다.
    SPACE: true,
    A: true,
    D: true,
}


Object.freeze(key);