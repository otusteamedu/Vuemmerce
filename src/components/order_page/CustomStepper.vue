<template>
    <b-tabs v-model="activeTab" position="is-centered" class="block" type="is-toggle" expanded>
        <b-tab-item v-for="(stepTab, index) in tabs" :label="stepTab.title" :key="index">
            <slot :name="'step' + (index + 1)">Контент для этого шага не указан</slot>

            <button v-if="(index + 1) !== stepTabs.length"
                    class="is-pulled-right button is-primary"
                    @click="nextTab(index)">
                Продолжить
            </button>
            <button v-else class="is-pulled-right button is-primary"
                    @click="submit()">
                {{ submitTitle }}
            </button>
        </b-tab-item>
    </b-tabs>
</template>

<script>
    export default {
      name: 'custom-stepper',
        props: {
            stepTabs: {
                type: Array,
                required: true
            },
            submitTitle: {
                type: String,
                required: true
            },
            submit: {
                type: Function,
                required: true
            },
            next: {
                type: Function,
                required: false
            },
            filterIndex: {
                type: Number,
                required: false
            }
        },
        data: function() {
          return {
              activeTab: 0
          };
        },
        computed: {
            tabs: function() {
                if (this.filterIndex >= 0) {
                    return this.stepTabs.filter(st => this.stepTabs.indexOf(st) !== this.filterIndex)
                }
                return this.stepTabs;
            }
        },
        methods: {
            nextTab: function(index) {
                if (this.next) {
                    this.next(index);
                }
                this.activeTab = index + 1
            }
        }
    };
</script>

