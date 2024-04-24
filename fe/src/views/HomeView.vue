<template>
  <div>
    HOME
  </div>
</template>

<script>
export default {
  mounted() {
    const hasRefreshed = localStorage.getItem('hasRefreshed');
    if (!hasRefreshed) {
      this.refreshPage();
      localStorage.setItem('hasRefreshed', true);
    }
  },
  methods: {
    refreshPage() {
      window.location.reload();
    }
  }
};
</script>
