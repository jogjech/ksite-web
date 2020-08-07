<template>
  <div>
    <nav-bar />
    <div class="container m-auto pt-8 px-4 max-w-screen-lg">
      <!-- <p class="text-3xl font-normal py-4">Labs</p> -->
      <div
        class="max-w-sm rounded-md overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer"
        @click="$router.push('/labs/conan')"
      >
        <img
          class="w-full"
          src="https://pbs.twimg.com/profile_images/992196395494006786/3_LWrD1i_400x400.jpg"
          alt="Sunset in the mountains"
        />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">多瑙柯南播放器</div>
          <p class="text-gray-700 text-base">
            多瑙的柯南页面在老电视上实战是太难选集了 我们来做个播放器吧
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
