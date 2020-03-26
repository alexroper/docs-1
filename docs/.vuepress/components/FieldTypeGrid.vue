<template>
  <div class="grid-container">
    <GridItem label="Assets" src="../images/field-assets.svg" />
    <GridItem label="Categories" src="../images/field-categories.svg" />
    <GridItem label="Checkboxes" src="../images/field-checkboxes.svg" />
    <GridItem label="Colors" src="../images/field-colors.svg" />
    <GridItem label="Date/Time" src="../images/field-date-time.svg" />
    <GridItem label="Dropdown" src="../images/field-dropdown.svg" />
    <GridItem label="Email" src="../images/field-email.svg" />
    <GridItem label="Entries" src="../images/field-entries.svg" />
    <GridItem label="Lightswitch" src="../images/field-lightswitch.svg" />
    <GridItem label="Matrix" src="../images/field-matrix.svg" />
    <GridItem label="Multi-select" src="../images/field-multi-select.svg" />
    <GridItem label="Number" src="../images/field-number.svg" />
    <GridItem label="Plain Text" src="../images/field-plain-text.svg" />
    <GridItem label="Radio Buttons" src="../images/field-radio-buttons.svg" />
    <GridItem label="Table" src="../images/field-table.svg" />
    <GridItem label="Tags" src="../images/field-tags.svg" />
    <GridItem label="URL" src="../images/field-url.svg" />
    <GridItem label="Users" src="../images/field-users.svg" />
  </div>
</template>

<style>
.grid-container {
  width: 100%;
  display: grid;
  grid-template-columns: 23% 23% 23% 23%;
  grid-gap: 1rem 3%;
}
</style>

<script>
import GridItem from "./GridItem";

export default {
  components: {
    GridItem
  }
};
</script>
