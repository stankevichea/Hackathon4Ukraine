<template>
  <div className="flex justify-center">
    <div
      className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg"
    >
      <div className="p-6 flex flex-col justify-start">
        <h5 className="text-gray-900 text-xl font-medium mb-2">Card title</h5>
        <p className="text-gray-700 text-base mb-4">
          This is a wider card with supporting text below as a natural lead-in
          to additional content. This content is a little bit longer.
        </p>
        <p className="text-gray-600 text-xs">Last updated 3 mins ago</p>
      </div>
      <div className="w-full h-96 md:h-auto object-cover p-5 border-1 rounded-sm">
        <p className="pt-4">12PHONE</p>
        <p className="py-2">website</p>
        <p>description</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Test",
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
