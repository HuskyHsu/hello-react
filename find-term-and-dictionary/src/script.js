// nodes
const article_node = document.getElementById("article");
const sentence_nodes = [...article_node.querySelectorAll("p")];
const input_node = document.getElementById("search_text");
const close_node = document.getElementById("close");

// event
const getSearchValue = (event) => {
  if (this.timer) {
    clearTimeout(this.timer);
    this.timer = null;
  }
  this.timer = setTimeout(() => {
    hight(event.target.value.trim());
  }, 500);
};
input_node.addEventListener("keyup", getSearchValue);
close_node.addEventListener("click", () => {
  toggleDict(false);
  input_node.value = "";
  hight("");
});
document.onselectionchange = () => {
  if (this.timer) {
    clearTimeout(this.timer);
    this.timer = null;
  }
  this.timer = setTimeout(() => {
    const selection = window.getSelection().toString();
    if (selection === "" || selection.split(" ").length > 3) {
      return;
    }
    input_node.value = selection;
    hight(selection);
  }, 500);
};

// text
const sourceSentences = sentence_nodes.map((node) =>
  node.getInnerHTML().trim()
);
let meanings = [];
let currMeaningId = null;

// parse fuction
const genMarkText = (searchText) => {
  // <mark class="bg-blue-900 text-white">fish</mark>
  const mark = document.createElement("mark");
  const text = document.createTextNode(searchText);
  mark.appendChild(text);
  mark.classList.add("bg-blue-900", "text-white");
  return mark.outerHTML;
};

const genP = (sentence, reSearch) => {
  const p = document.createElement("p");
  const match = new Set(sentence.match(reSearch));
  p.innerHTML = [...match.values()]
    .sort((a, b) => (a.toLowerCase() == b ? 1 : -1))
    .reduce((acc, key) => {
      const reReplace = new RegExp(key, "g");
      const mark = genMarkText(key);
      return acc.replace(reReplace, mark);
    }, sentence);
  return p;
};

const getMarkPosition = () => {
  return [...article_node.querySelectorAll("mark")].map((element) => {
    return element.getBoundingClientRect();
  });
};

const hightSearchText = (sourceSentences, searchText) => {
  const hight = async (searchText) => {
    const reSearch = new RegExp(searchText, "gi");
    while (article_node.firstChild) {
      article_node.removeChild(article_node.firstChild);
    }

    sourceSentences
      .map((sentence) => {
        return genP(sentence, reSearch);
      })
      .forEach((p) => {
        article_node.appendChild(p);
      });

    const dict = await getDictionary(searchText);
    if (dict == null) {
      return toggleDict(false);
    }
    meanings = dict.meanings.map((meaning, i) => {
      return {
        partOfSpeech: meaning.partOfSpeech,
        definition: meaning.definitions[0].definition,
        example: meaning.definitions[0].example,
        meaningId: i + 1
      };
    });
    currMeaningId = 0;
    toggleDict(
      updateContent(
        { word: dict.word, phonetic: dict.phonetic },
        meanings[currMeaningId]
      )
    );
  };

  return (searchText) => {
    hight(searchText);
  };
};

const hight = hightSearchText(sourceSentences);

const getDictionary = async (searchText) => {
  if (searchText === "") {
    return null;
  }
  try {
    const apiPath = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchText}`;
    const response = await fetch(apiPath);
    const data = await response.json();

    if (!Array.isArray(data)) {
      return null;
    }

    return {
      word: data[0].word,
      phonetic: `/${data[0].phonetic}/`,
      meanings: data[0].meanings
    };
  } catch (err) {
    return {
      word: "husky",
      phonetic: `/ˈhʌski/`,
      meanings: [
        {
          partOfSpeech: "adjective",
          definitions: [
            {
              definition:
                "(of a voice or utterance) sounding low-pitched and slightly hoarse.",
              example: "his voice became a husky, erotic whisper"
            }
          ]
        },
        {
          partOfSpeech: "QAQ",
          definitions: [
            {
              definition:
                "definition definition definition definition definition",
              example: "example example example example example example"
            }
          ]
        }
      ]
    };
  }
};

const moveDictionary = (element) => {
  return (position) => {
    element.style.top = `${position.top}px`;
    element.style.left = `${position.left}px`;
  };
};

const updateDictionary = () => {
  const dict_node = document.getElementById("dictionary");
  const move = moveDictionary(dict_node);
  const headerIds = ["word", "phonetic"];
  const meaningIds = ["partOfSpeech", "definition", "example", "meaningId"];
  const headerElements = headerIds.map((id) => document.getElementById(id));
  const meaningElements = meaningIds.map((id) => document.getElementById(id));
  const updateMeaning = (meaning) => {
    if (meaning == null) {
      return;
    }
    meaningElements.forEach((element, i) => {
      element.innerText = meaning[meaningIds[i]];
    });
  };
  const [prev, next] = [...dict_node.querySelectorAll("svg")];
  prev.addEventListener("click", () => {
    if (currMeaningId === 0) {
      return;
    }
    updateMeaning(meanings[currMeaningId - 1]);
    currMeaningId -= 1;
  });
  next.addEventListener("click", () => {
    if (currMeaningId + 1 >= meanings.length) {
      return;
    }
    updateMeaning(meanings[currMeaningId + 1]);
    currMeaningId += 1;
  });
  return {
    updateMeaning: updateMeaning,
    updateContent: (dict, meaning) => {
      headerElements.forEach((element, i) => {
        element.innerText = dict[headerIds[i]];
      });
      updateMeaning(meaning);
      const markPosition = getMarkPosition();
      if (markPosition.length < 1) {
        return false;
      }
      move(markPosition[0]);
      return true;
    },
    toggleDict: (on) => {
      if (on) {
        dict_node.classList.remove("hidden");
      } else {
        dict_node.classList.add("hidden");
      }
    }
  };
};

const { updateContent, updateMeaning, toggleDict } = updateDictionary();
