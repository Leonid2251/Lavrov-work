<template>
  <v-row>
    <v-col cols="12" sm="12" md="12" lg="12" class="pt-0">
      <v-card>
        <v-card-title>Исходные данные</v-card-title>
        <v-card-subtitle>Материального баланса доменной плавки</v-card-subtitle>
        <v-card-text>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-row no-gutters>
              <!-- Перебор массива -->
              <v-col
                cols="6"
                align="center"
                class="pr-4 pl-4"
                v-for="value in values"
                :key="value.name"
              >
                  <v-text-field
                    required
                    :name="value.name"
                    :label="value.label"
                    type="text"
                    :suffix="value.suffix"
                    placeholder="Введите значение"
                    v-model.trim="value.value"
                    :rules="rules.field"
                  ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="submitHandler" :disabled="!valid"
            >Рассчитать</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    name: "newDryingDrumHeatBalance",
    valid: false,
    rules: {
      field: [
        v => !!v || "Поле не может быть пустым",
        v => /(?<=^| )\d+(\.\d+)?(?=$| )/.test(v) || "Некорректное значение"
      ]
    },
    valueArr: null,
    values: {
      srSutProizv: {
        label: "Среднесуточная производительность",
        value: 3300,
        suffix: "т"
      },
      kolKoks: {
        label:
          "Количество кокса, сжигаемого в 1 м3 полезного объема печи в сутки (интенсивность плавки)",
        value: 990,
        suffix: "кг/м3"
      },
      koks: {
        label: "Кокс (сухой)",
        value: 600,
        suffix: "кг"
      },
      agl: {
        label: "Агломерат",
        value: 1860,
        suffix: "кг"
      },
      izvDol: {
        label: "Известняк доломитизированный",
        value: 62,
        suffix: "кг"
      },
      viDut: {
        label: "Влажность дутья",
        value: 20,
        suffix: "г/м3"
      },
      vinKol: {
        label: "Вынос колошниковой пыли",
        value: 60,
        suffix: "кг/т"
      },
      kolShl: {
        label: "Количество шлака",
        value: 624,
        suffix: "кг/т"
      },
      kolCo2: {
        label: "CO2",
        value: 13,
        suffix: "%"
      },
      kolCo: {
        label: "CO",
        value: 28,
        suffix: "%"
      },
      kolCh4: {
        label: "Ch4",
        value: 0.4,
        suffix: "%"
      },
      kolH2: {
        label: "H2",
        value: 2,
        suffix: "%"
      },
      kolN2: {
        label: "N2",
        value: 56,
        suffix: "%"
      },
      ChuFe: {
        label: "Fe",
        value: 96.3,
        suffix: "%"
      },
      ChuC: {
        label: "C",
        value: 4.56,
        suffix: "%"
      },
      ChuP: {
        label: "P",
        value: 0.2,
        suffix: "%"
      },
      ChuMn: {
        label: "Mn",
        value: 1.08,
        suffix: "%"
      },
      ChuSi: {
        label: "Si",
        value: 0.7,
        suffix: "%"
      },
      Zola: {
        label: "Золы",
        value: 10,
        suffix: "%"
      },
      Letu: {
        label: "Летучих",
        value: 1.5,
        suffix: "%"
      },
      UglNeLet: {
        label: "Углерода(нелетучего)",
        value: 84.7,
        suffix: "%"
      },
      sera: {
        label: "Серы",
        value: 1.8,
        suffix: "%"
      },
      letCo2: {
        label: "Co2",
        value: 0.3,
        suffix: "%"
      },
      letCo: {
        label: "Co",
        value: 0.3,
        suffix: "%"
      },
      letN: {
        label: "N",
        value: 0.84,
        suffix: "%"
      },
      letCh4: {
        label: "Ch4",
        value: 0.06,
        suffix: "%"
      }
    }
  }),

  methods: {
    async submitHandler() {
      if (this.$refs.form.validate()) {
        const recordData = this.values;
        const recordId = await this.$store.dispatch("pushRecord", recordData);
        this.$router.push(`/result/${recordId}`);
      }
    }
  }
};
</script>

<style scoped>
.preview {
  padding: 0.1rem 1.5rem;
}
.preview:last-child {
  padding: 0.1rem 1.5rem 1rem;
}
</style>
