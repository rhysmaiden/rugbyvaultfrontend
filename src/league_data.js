const tabs = [
  "All",
  "International",
  "Super Rugby",
  "Premiership",
  "Pro 14",
  "USA",
  "Mitre 10"
];

const tab_slugs = [
  "all",
  "international",
  "superrugby",
  "aviva",
  "pro14",
  "usa",
  "mitre10"
];

const teams_in_leagues = [
  {
    league: "International",
    teams: [
      { name: "Australia", link: "/team/47" },
      { name: "South Africa", link: "/team/46" },
      { name: "New Zealand", link: "/team/45" },
      { name: "England", link: "/team/49" },
      { name: "Wales", link: "/team/52" },
      { name: "Ireland", link: "/team/50" },
      { name: "France", link: "/team/53" },
      { name: "Japan", link: "/team/55" },
      { name: "Scotland", link: "/team/51" },
      { name: "Argentina", link: "/team/48" },
      { name: "Fiji", link: "/team/56" },
      { name: "Italy", link: "/team/54" },
      { name: "Tonga", link: "/team/57" },
      { name: "Georgia", link: "/team/61" },
      { name: "Samoa", link: "/team/58" }
    ]
  },
  {
    league: "Super Rugby",
    teams: [
      { name: "Crusaders", link: "/team/8" },
      { name: "Jaguares", link: "/team/19" },
      { name: "Brumbies", link: "/team/7" },
      { name: "Hurricanes", link: "/team/10" },
      { name: "Bulls", link: "/team/14" },
      { name: "Sharks", link: "/team/13" },
      { name: "Chiefs", link: "/team/11" },
      { name: "Highlanders", link: "/team/9" },
      { name: "Lions", link: "/team/16" },
      { name: "Stormers", link: "/team/15" },
      { name: "Rebels", link: "/team/6" },
      { name: "Waratahs", link: "/team/3" },
      { name: "Blues", link: "/team/12" },
      { name: "Reds", link: "/team/4" },
      { name: "Sunwolves", link: "/team/20" }
    ]
  },
  {
    league: "Premiership",
    teams: [
      { name: "Northampton Saints", link: "/team/80" },
      { name: "Bristol Bears", link: "/team/21" },
      { name: "Worcester Warriors", link: "/team/32" },
      { name: "Sale Sharks", link: "/team/28" },
      { name: "London Irish", link: "/team/25" },
      { name: "Gloucester", link: "/team/27" },
      { name: "Harlequins", link: "/team/23" },
      { name: "Bath", link: "/team/26" },
      { name: "Wasps", link: "/team/22" },
      { name: "Leicester Tigers", link: "/team/30" },
      { name: "Saracens", link: "/team/29" }
    ]
  },
  {
    league: "Pro 14",
    teams: [
      { name: "Leinster", link: "/team/33" },
      { name: "Munster", link: "/team/34" },
      { name: "Ulster", link: "/team/35" },
      { name: "Connacht", link: "/team/36" },
      { name: "Scarlets", link: "/team/37" },
      { name: "Ospreys", link: "/team/38" },
      { name: "Dragons", link: "/team/39" },
      { name: "Cardiff Blues", link: "/team/40" },
      { name: "Glasgow Warriors", link: "/team/41" },
      { name: "Edinburgh", link: "/team/42" },
      { name: "Treviso", link: "/team/43" },
      { name: "Zebre", link: "/team/44" },
      { name: "Cheetahs", link: "/team/18" },
      { name: "Southern Kings", link: "/team/17" }
    ]
  }
];

export { tabs, tab_slugs, teams_in_leagues };
