<template>
  <div>
    HOME
  </div>
</template>

<script>
export default {
  mounted() {
    const hasRefreshed = sessionStorage.getItem('hasRefreshed');
    if (!hasRefreshed) {
      this.refreshPage();
      sessionStorage.setItem('hasRefreshed', true);
    }
  },
  methods: {
    refreshPage() {
      window.location.reload();
    }
  }
};
</script>
