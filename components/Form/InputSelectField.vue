<template>
  <ValidationProvider
      :debounce="300"
      :name="label"
      :rules="rules"
      ref="input"
      v-slot="{ errors,validate ,classes,valid}">
    <div :class="`form-group`">
      <label class="small text-capitalize text-dark" style="min-height: 1rem" v-if="label">
        {{ label }}<span class="text-danger ml-1" v-if="isRequired">*</span>
        <i :title="help" class="fa fa-exclamation-circle text-info p-1" v-b-tooltip.hover v-if="help"/>
      </label>
      <multiselect
          :allow-empty="getAllowEmpty()"
          :close-on-select="true"
          :data-testid="testid"
          :loading="isLoading"
          :options="options"
          :placeholder="placeholder || label || 'Please select'"
          :searchable="true"
          :show-labels="false"
          @input="(inputValue, id)=> $emit('input',inputValue)"
          @remove="(removedOption, id)=> $emit('remove',removedOption.value)"
          @search-change="(searchQuery, id)=> $emit('search',searchQuery)"
          @select="(selectedOption, id)=> $emit('select',selectedOption.value)"
          class="pointer"
          label="label"
          tagPosition="bottom"
          track-by="value"
          v-model="innerValue">
        <template slot="noResult">ไม่พบข้อมูล</template>
        <template slot="singleLabel" slot-scope="{ option }">{{ option.label }}</template>
        <template slot="option" slot-scope="{ option }">
          {{ option.label }}
        </template>
        <template slot="clear" slot-scope="props">
          <div style="position: absolute;right: 38px;z-index: 1;top: 8px;color: rgb(177, 185, 193);"
               v-if="(innerValue !== null) && !isRequired">
            <i @click.prevent="onClear" class="si si-close"/>
          </div>
        </template>
      </multiselect>
      <p class="invalid-feedback d-block" v-if="getError(errors[0])" v-html="getError(errors[0])"/>
    </div>
  </ValidationProvider>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator'
import {BaseSelectInput} from '~/core/Base'

@Component
export default class InputSelectField extends BaseSelectInput {
  getAllowEmpty = () => {
    return !this.allowEmpty ? false : !this.isRequired;
  }
}
</script>

<style lang="scss" scoped>
</style>
