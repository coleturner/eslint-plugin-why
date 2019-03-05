# eslint-plugin-why

Enforces adding a comment before disabling an ESLint rule (WIP)

## Rule: why/tell-me-why

### Good Examples

```js
// eslint-why some people just like to watch the world burn
// eslint-disable-next-line semi
someCodeHere();
```

```js
/*
        eslint-why
        some people just like to watch the world burn
    */
// eslint-disable-next-line semi
someCodeHere();
```

### Bad Examples

No why comment:

```js
someCodeHere();

// eslint-disable-next-line semi
someCodeThere();
```

Why comment is too far away:

```js
// eslint-why some people just like to watch the world burn

console.log("I like turtles");

// eslint-disable-next-line semi
someCodeHere();
```
