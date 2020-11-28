<template>
  <div>
    <h2 style="margin-bottom: 1rem" v-if="loading">Исходные данные</h2>
    <v-data-table
      v-if="loading"
      :headers="headersInput"
      :items="recordInfo"
      multi-sort
      style="margin-bottom: 1rem"
      class="elevation-1"
      :footerProps="{
        itemsPerPageText: 'Количество на странице',
        itemsPerPageAllText: 'Все'
      }"
    >
      <template v-slot:no-data>
        <span>Записи отсутствуют</span>
      </template>

      <template
        v-slot:[`footer.page-text`]="{ pageStart, itemsLength, pageStop }"
      >
        {{ pageStart }}-{{ pageStop }} из {{ itemsLength }}
      </template>
    </v-data-table>

    <h2 style="margin-bottom: 1rem" v-if="loading">Расчетные данные</h2>
    <v-data-table
      v-if="loading"
      :headers="headersOutput"
      :items="detailCalcArr"
      style="margin-bottom: 1rem"
      multi-sort
      class="elevation-1"
      :footerProps="{
        itemsPerPageText: 'Количество на странице',
        itemsPerPageAllText: 'Все'
      }"
    >
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
      v-if="!loading"
      item-key="name"
      class="elevation-1"
      loading
      loading-text="Загрузка..."
    ></v-data-table>

    <h2 style="margin-bottom: 1rem" v-if="loading">Графики</h2>
    <v-row>
      <v-col cols="6">
    <PieChart style="width: 80%; height: 80%; margin-bottom: 1rem" v-if="loading" :chartData="datacollectionPie"></PieChart>
    </v-col>
    <v-col cols="6">
    <PieChart style="width: 80%; height: 80%; margin-bottom: 1rem" v-if="loading" :chartData="datacollectionPie2"></PieChart>
    </v-col>
    </v-row>

    <h2 v-if="loading">Сохранение расчета</h2>
    <v-form v-model="valid" validation v-if="loading">
      <v-text-field
        label="Наименование"
        name="variant"
        type="text"
        v-model.trim="variant"
        :rules="rules.variant"
      ></v-text-field>
    </v-form>
    <v-btn :disabled="!valid" @click="saveSubmit" v-if="loading"
      >Сохранить расчет</v-btn
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PieChart from "@/components/app/Pie"

export default {
  data() {
    return {
      loading: false,
      datacollectionPie: null,
      datacollectionPie2: null,
      valid: false,
      variant: "",
      detailCalcArr: [],
      rules: {
        variant: [v => !!v || "Поле не может быть пустым"]
      },
      headersInput: [
        { text: "Номер", value: "id" },
        {
          text: "Описание",
          align: "start",
          sortable: false,
          value: "label"
        },
        { text: "Единицы измерения", value: "suffix" },
        { text: "Значение", value: "value" }
      ],
      headersOutput: [
        { text: "Номер", value: "id" },
        {
          text: "Описание",
          align: "start",
          sortable: false,
          value: "label"
        },
        { text: "Единицы измерения", value: "suffix" },
        { text: "Значение", value: "value" }
      ],

      detailCalc: {
        kolGazNaMetr: {
          label: "Колошниковый газ",
          suffix: "м3",
          value: null
        },
        naUglerod: {
          label: "В перерасчете на углерод",
          suffix: "кг",
          value: null
        },
        neLetUglerod: {
          label: "На 1 тонну чугуна вносится коксом нелетучего углерода",
          suffix: "кг",
          value: null
        },
        perehVChu: {
          label: "Переходит в чугун и колошниковую пыль углерода",
          suffix: "кг",
          value: null
        },
        kolGazvKol: {
          label: "Всего в колошниковый газ переходит углерода",
          suffix: "кг",
          value: null
        },
        suhGaz: {
          label: "Образуется сухого газа, м3/кг.чуг",
          suffix: "м3",
          value: null
        },
        perehod: {
          label: "Из кокса переходит влаги в колошниковый газ",
          suffix: "кг",
          value: null
        },
        vlazGaz: {
          label: "Влажного газа будет",
          suffix: "кг",
          value: null
        },
        vSuhGazAzot: {
          label: "В сухом газе азота",
          suffix: "м3",
          value: null
        },
        koksAzVnoz: {
          label: "Коксом азота вносится",
          suffix: "м3",
          value: null
        },
        azVnozDut: {
          label: "Азота вносится дутьем",
          suffix: "м3",
          value: null
        },
        soderVl: {
          label: "В одном метре кубического дутья содержится влаги",
          suffix: "кг",
          value: null
        },
        azot: {
          label: "Азот",
          suffix: "м3",
          value: null
        },
        kislorod: {
          label: "Кислород",
          suffix: "м3",
          value: null
        },
        kolVlDut: {
          label: "Количество влажного дутья",
          suffix: "м3",
          value: null
        },
        vlagaitog: {
          label: "Влага",
          suffix: "кг",
          value: null
        },
        azotitog: {
          label: "Азот итог",
          suffix: "кг",
          value: null
        },
        kislorodItog: {
          label: "Кислород итог",
          suffix: "кг",
          value: null
        },
        itog: {
          label: "Итог",
          suffix: "кг",
          value: null
        }
      }
    };
  },
  components: {
    PieChart
  },
  computed: {
    ...mapGetters(["recordInfo", "recordInfoObj"])
  },
  async created() {
    const recordId = this.$route.params.id;
    await this.$store.dispatch("fetchRecord", recordId);

    const input = this.recordInfoObj;
    const output = this.detailCalc;

    output.kolGazNaMetr.value = (
      (input.kolCo2.value + input.kolCo.value + input.kolCh4.value) /
      100
    ).toFixed(4);
    output.naUglerod.value = ((output.kolGazNaMetr.value * 12) / 22.4).toFixed(
      4
    );
    output.neLetUglerod.value = (
      ((input.koks.value / 1000) * input.UglNeLet.value) /
      100
    ).toFixed(4);
    output.perehVChu.value = (
      input.ChuC.value / 100 +
      (input.vinKol.value / 1000) * 0.075 +
      0.05
    ).toFixed(4);
    output.kolGazvKol.value = (output.neLetUglerod.value - 0.05).toFixed(4);
    output.suhGaz.value = (
      output.kolGazvKol.value / output.naUglerod.value
    ).toFixed(4);
    output.perehod.value = (
      ((input.koks.value / 1000) * input.kolH2.value) /
      100
    ).toFixed(4);
    output.vlazGaz.value = (
      +output.suhGaz.value +
      0.016 +
      +output.perehod.value
    ).toFixed(4);
    output.vSuhGazAzot.value = (2.063 * 0.566).toFixed(4);
    output.koksAzVnoz.value = (
      ((((input.koks.value / 1000) * input.letN.value) / 100) * 22.4) /
      input.kolCo.value
    ).toFixed(4);
    output.azVnozDut.value = (
      output.vSuhGazAzot.value - output.koksAzVnoz.value
    ).toFixed(4);
    output.soderVl.value = (input.viDut.value / 1000).toFixed(4);
    output.azot.value = ((1 - output.soderVl.value) * 0.79).toFixed(4);
    output.kislorod.value = (
      1 -
      output.azot.value -
      output.soderVl.value
    ).toFixed(4);
    output.kolVlDut.value = (
      output.azVnozDut.value / output.azot.value
    ).toFixed(4);
    output.vlagaitog.value = (
      (output.kolVlDut.value * output.soderVl.value * 18) /
      22.4
    ).toFixed(4);
    output.azotitog.value = (
      (output.kolVlDut.value * output.azot.value * 28) /
      22.4
    ).toFixed(4);
    output.kislorodItog.value = (
      (output.kolVlDut.value * output.kislorod.value * 32) /
      22.4
    ).toFixed(4);
    output.itog.value = (
      +output.vlagaitog.value +
      +output.azotitog.value +
      +output.kislorodItog.value
    ).toFixed(4);

    this.detailCalcArr = await Object.keys(this.detailCalc).map(
      (key, value) => ({
        ...this.detailCalc[key],
        id: value + 1
      })
    );

    this.datacollectionPie = {
      labels: ["Кислород","Азот","Влага"],
      datasets: [
        {
          label: "Состав дутья",
          backgroundColor: [
            "#b7c06f",
            "#dde0b6",
            "#f3e6be",
          ],
          data: [
            output.kislorodItog.value,
            output.azotitog.value,
            output.vlagaitog.value
          ]
        }
      ]
    },

    this.datacollectionPie2 = {
      labels: ["Зола","Летучие","Углерод",'Сера'],
      datasets: [
        {
          label: "Состав кокса",
          backgroundColor: [
            "#f3e6be",
            "#f5a883",
            "#9b3c2e",
            "#79673f"
          ],
          data: [
            input.Zola.value,
            input.Letu.value,
            input.UglNeLet.value,
            input.sera.value,
          ]
        }
      ]
    },
    this.loading = true;
  },
  methods: {
    async saveSubmit() {
      const objRecord = {
        recordData: this.recordInfo,
        recordId: this.$route.params.id,
        nameVariant: this.variant
      };
      await this.$store.dispatch("saveRecord", objRecord);
      this.$router.push("/favorites");
    }
  }
};
</script>