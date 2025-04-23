## Node-Express - News site 




Backend for the [news-site](https://github.com/dmitry-podkyuko/news_site_front_podkyuko) project.

Stack: [`Express`](https://expressjs.com/), [`React`](https://ru.reactjs.org/), [`Redux`](https://redux.js.org/), [`Redux-saga`](https://redux-saga.js.org/)

DEV: http://localhost:4000


### Deploy

```shell script
npm i
```

### Environment

The `.env` file is required.

See the [.env.example](.env.example) for more information.

### Launch

```shell script
npm run start
```




## API

- http://localhost:4000 base url

- http://localhost:4000/api/auth/registration  'POST' регистрация
- http://localhost:4000/api/auth/login         'POST' вход
- http://localhost:4000/api/auth/logout        'POST' выход
- http://localhost:4000/api/auth/refresh       'POST' refresh (token)


- http://localhost:4000/api/news/              'GET' получение всех
- http://localhost:4000/api/news/:id           'GET' получение по id
- http://localhost:4000/api/news/              'POST' создание новой
- http://localhost:4000/api/news/:id           'DELETE' удаление по id


- http://localhost:4000/api/users           Don`t worked

