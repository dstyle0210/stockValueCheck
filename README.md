# Vue3 + Typescript + Vite + Playweight

공부겸 머리쓸겸 해서 진행하는 펫

---


# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

- 윈도우10 기본앱 변경(익스 -> 크롬)
- 윈도우10 파워쉘 권한설정
Set-ExecutionPolicy RemoteSigned

- npm 글로벌 설치
npm i firebase firebase-tools gulp-cli typescript -g

- git 사용자 정보 저장
git config --global user.name "dstyle0210"
git config --global user.email dstyle0210@gmail.com