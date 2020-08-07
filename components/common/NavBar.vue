<template>
  <div>
    <nav class="bg-white px-8 pt-2 shadow-md">
      <div class="-mb-px flex justify-center">
        <NavBarItem href="/" text="Home" />
        <NavBarItem href="/blog" text="Blog" />
        <NavBarItem href="/labs" text="Labs" />
        <NavBarItem href="/about" text="About" />
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>
