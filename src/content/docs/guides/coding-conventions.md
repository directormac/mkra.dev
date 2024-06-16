---
title: Coding Conventions
---
## Directory/File Naming and Structure

Directory Names

- lower-case for naming directories `src`
- when contains multiple words use hyphen(dash) `create-item`
- categorized files inside `models` `types` `shared` `repository` `utils` same goes to subdirectories

File Names

- pascal-case example `CreateUser.ts`
- default or barrel files will always be names `index.ts`
- for singletons such as classes or functions that serves as a provider/factory/repository/builder will always be named as `user.repository.ts` within the `src/repository/` directory it must be exported by the barrel or `index.ts` of that directory e.g

```ts
// src/repository/user.repository.ts

const findUserById = (id: string) => {
 return user;
}

const createUser = () => {
 return message;
}

const findUser = ({id?: string, uniqueConstrains?: any}) => {
 return user;
}

const deleteUser = () => {
 return message;
}

const updateUser = () => {
 return message;
}

// Only export what needs to be exported
export {
createUser,
findUser,
deleteUser,
updateUser
}
```

```ts
// src/reposity/index.ts
export * from 'user.repository'
```

- Types or Interfaces will always follow the convention `[Name].interfaces|types.ts` e.g
  `User.types.ts` files should also be at the `types or interfaces` directory unless its a class/function specific type / interface it should not be exported

```ts
type UserRole = 'USER' | 'ADMIN' | 'MANAGER' | 'GUEST'

type User = {
 id: string
 username: string
 password: stirng
 email: string // unique
 role: UserRole
}

type UserCreate = Omit<User, 'id' | 'role'> & {
 confirmPassword: string
}

type UserFind = Pick<User, 'id' | 'email'>

type UserUpdate = {
 id: string
 data: User
}

type UserDelete = Pick<User, 'id' | 'email'>

type GuestUser = Pick<User, 'email'> & {
 role: 'GUEST'
}
type AdvanceModel = {
 [key: string]: any
} | null

type MasterRecord = {
 master: Record<string, any>
}
```

# Coding standards

## HTML

Keep it clean!

## TypeScript

Avoid using `any` if unavoidable and dealing with the `unknown`

Refer on the docs for additional information [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

```ts
// Use case for extracting form values results in a FormData object
type FormDataRecord = Record<sting, any>

const createFormDataFromObject = (data: FormDataRecord): FormData => {
 const formData = new FormData()
 Object.keys(data).forEach((key) => {
  formData.append(key, data[key])
 })
 return formData
}
```

```ts
// Avoiding the unknown
export const empty = (value: any) => value === undefined || value === null || value === ''

let theUnknown
empty(theUnknown) // true
theUnknwon = ''
empty(theUnknown) // true
theUnknown = {}
empty(theUnknown) // true
```

