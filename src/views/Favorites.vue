<template>
  <div>
    <v-data-table
      v-if="loading"
      :headers="headers"
      :items="recordSave"
      multi-sort
      class="elevation-1"
      :footerProps="{
        itemsPerPageText: 'Количество на странице',
        itemsPerPageAllText: 'Все'
      }"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              :to="`/result/${item.recordId}`"
            >
              <v-icon small class="mr-2">
                mdi-eye
              </v-icon>
            </v-btn>
          </template>
          <span>Открыть</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              @click="deleteSaveRecord(item.recordId)"
            >
              <v-icon small class="mr-2">
                mdi-delete
              </v-icon>
            </v-btn>
          </template>
          <span>Удалить</span>
        </v-tooltip>
      </template>

      <template v-slot:no-data>
        <span>Записи отсутствуют</span>
      </template>

      <template
        v-slot:[`footer.page-text`]="{ pageStart, itemsLength, pageStop }"
      >
        {{ pageStart }}-{{ pageStop }} из {{ itemsLength }}
      </template>
    </v-data-table>

    <v-data-table
      v-else
      item-key="name"
      class="elevation-1"
      loading
      loading-text="Загрузка..."
    ></v-data-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      loading: false,
      headers: [
        {
          text: "Номер",
          align: "start",
          sortable: false,
          value: "id"
        },
        { text: "Наименование", value: "nameVariant" },
        { text: "Дата", value: "date" },
        { text: "Действия", value: "actions", sortable: false }
      ]
    };
  },
  computed: {
    ...mapGetters(["recordSave"])
  },
  watch: {
    recordSave: function(val) {
      this.loading = true;
    }
  },
  mounted() {
    if (this.recordSave) {
      this.loading = true;
    }
  },
  methods: {
    async deleteSaveRecord(recordId) {
      await this.$store.dispatch("deleteSaveRecord", recordId);
    }
  }
};
</script>