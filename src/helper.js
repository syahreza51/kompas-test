import _ from "lodash";

export const encodeQueryData = (data) => {
  const ret = [];

  for (const d in data) {
    let value = data[d];

    if (typeof value === "object") {
      value = data[d].join(",");
    }

    ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(value));
  }

  return ret.join("&");
};

export const transformCarPrice = (min, max, Lang) => {
  const currency = "Rp ";

  const transformPostfix = getPostfixPriceByLang(Lang);

  const minPostfix = transformPostfix(min);
  const maxPostfix = transformPostfix(max);

  const minPrice = formatPriceCar(min);
  const maxPrice = formatPriceCar(max);

  return (
    currency +
    [minPrice + minPostfix, maxPrice + maxPostfix]
      .filter((e) => !!e)
      .join(" - ")
  );
};

const getPostfixPriceByLang = (Lang) => (price) => {
  if (!price) return "";
  const thePostfix = price.toString().length < 10 ? "juta" : "milyar";
  const MAP_POSTFIX = {
    juta: {
      id: " juta",
      en: " million",
    },
    milyar: {
      id: " milyar",
      en: " billion",
    },
  };

  return MAP_POSTFIX[thePostfix][Lang];
};

export const formatPriceCar = (amount) => {
  if (!amount) return "";

  const formattedAmount = amount
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  try {
    const transformedString = formattedAmount.match(/^(\d+),\d{1}/)[0];
    if (transformedString[transformedString.length - 1] === "0") {
      return transformedString.slice(0, -2);
    }

    return transformedString;
  } catch (_) {
    return formattedAmount;
  }
};

export function checkVisible(elm) {
  const rect = elm.getBoundingClientRect();
  const offset = elm.clientHeight / 2;
  const viewHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight
  );
  return !(rect.bottom - offset < 0 || rect.top - viewHeight >= 0);
}

export const boldString = (str, find) => {
  const cleanedEscapedCharacter = find.replace("\\", "");
  const findPattern = new RegExp(cleanedEscapedCharacter, "gi");
  return str.toString().replace(findPattern, "<strong>$&</strong>");
};

export const removeTailSpaces = (str) => {
  return str.replace(/\s+$/, "");
};

export function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export const transformFilterToQuery = (filter) => {
  const q = filter.q;
  const price =
    filter.price_min || filter.price_max
      ? `${filter?.price_min},${filter?.price_max}`
      : "";
  const type_body = filter?.type_body.map((item) => item.value).join(",");
  const model_slug = filter?.model_slug;
  const brand_slug = filter?.brand_slug;
  return getNonNullValuesObj({
    q,
    price,
    type_body,
    model_slug,
    brand_slug,
  });
};

export const getNonNullValuesObj = (obj) => {
  return _(obj)
    .pickBy(_.isObject) // pick objects only
    .mapValues(getNonNullValuesObj) // call only for object values
    .omitBy(_.isEmpty) // remove all empty objects
    .assign(_.omitBy(obj, _.isObject))
    .pickBy(_.identity)
    .value();
};

export const pushQueryParamInUrl = (obj) => {
  const url = _.isEmpty(obj)
    ? window.location.pathname
    : `${window.location.pathname}?${encodeQueryData(
        getNonNullValuesObj(obj)
      )}`;
  if (typeof window !== "undefined")
    window.history.replaceState(null, null, url);
};

export const removeQueryParamInUrl = (key, url = window.location.href) => {
  if (typeof window !== "undefined") {
    const replacer = (m, p1, p2) => (p1 === "?" && p2 === "&" ? "?" : p2 || "");
    const newUrl = url.replace(
      new RegExp(`([?&])${key}=[^&#]+([&#])?`),
      replacer
    );
    window.history.replaceState(null, null, newUrl);
  }
};

export const thousandRupiah = (str) => {
  const number_string = str
    .toString()
    .replace(/[^,\d]/g, "")
    .toString();
  const split = number_string.split(",");
  const sisa = split[0].length % 3;
  let rupiah = split[0].substr(0, sisa);
  const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  if (ribuan) {
    const separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;

  return rupiah ?? "";
};

export function ellipsisString(inputString, maxLength) {
  if (inputString.length > maxLength) {
    return inputString.substring(0, maxLength) + "...";
  }
  return inputString;
}

export const capitalizeFirstLetter = (words) => {
  const separateWord = words.toLowerCase().split(" ");
  for (let i = 0; i < separateWord.length; i++) {
    separateWord[i] =
      separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
  }
  return separateWord.join(" ");
};

export const transformSlugIntoLabel = (slug) => {
  return capitalizeFirstLetter(slug.split("-").join(" "));
};

export function timeSince(date, lang) {
  const dateLang = {
    years: {
      id: "tahun lalu",
      en: "years ago",
    },
    months: {
      id: "bulan lalu",
      en: "months ago",
    },
    days: {
      id: "hari lalu",
      en: "days ago",
    },
    hours: {
      id: "jam lalu",
      en: "hours ago",
    },
    minutes: {
      id: " menit lalu",
      en: "minutes ago",
    },
    seconds: {
      id: " detik lalu",
      en: "seconds ago",
    },
  };

  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ` ${dateLang?.years?.[lang]}`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ` ${dateLang?.months?.[lang]}`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ` ${dateLang?.days?.[lang]}`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ` ${dateLang?.hours?.[lang]}`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ` ${dateLang?.minutes?.[lang]}`;
  }
  return Math.floor(seconds) + ` ${dateLang?.seconds?.[lang]}`;
}
