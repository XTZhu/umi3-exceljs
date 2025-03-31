export const mockColumns = {
  excelTitle: 'mock LOL数据',
  isFetchAllData: false,
  sheetArray: [
    {
      fetchUrl: 'http://localhost:7777/api/lol/getStatsData',
      fetchOptions: {
        startTime: '1740758400,1743436799',
        teamIds: '',
        LeagueIds: '',
        isBattle: 0,
        pageNumber: 1,
        pageSize: 10,
        regions: '',
        sort: '-start_time',
      },
      sheetName: '表格2',
      columns: [
        {
          header: <span>'战队'</span>,
          key: 'match_name',
          width: 17,
        },
        {
          header: '日期',
          key: 'start_time',
          width: 16,
        },
        {
          header: '联赛',
          key: 'league_name',
          width: 15,
        },
        {
          header: '地图比分',
          key: 'bo_score',
          width: 6.6,
        },
        {
          header: '发生五杀时比分',
          key: 'race_to_5_kills_score',
          width: 11,
        },
        {
          header: '发生十杀时比分',
          key: 'race_to_10_kills_score',
          width: 12,
        },
        {
          header: '杀敌比分（总数）',
          key: 'kills_score',
          width: 13,
        },
        {
          header: '十分钟前比分（总）',
          key: 'mins_10_kills_score',
          width: 13,
        },
        {
          header: '二十分钟前比分',
          key: 'mins_20_kills_score',
          width: 13,
        },
        {
          header: '最高击杀数（位置）',
          key: 'max_kills_value_role',
          width: 13,
        },
        {
          header: '辅助位杀敌数（英雄）',
          key: 'role_sup_kills_score',
          width: 13,
        },
        {
          header: '中路选手击杀比分',
          key: 'role_mid_kills_score',
          width: 13,
        },
        {
          header: 'ADC选手击杀比分',
          key: 'role_adc_kills_score',
          width: 13,
        },
        {
          header: '红方最高个人阵亡数',
          key: 'team_1_max_deaths',
          width: 10,
        },
        {
          header: '蓝方方最高个人阵亡数',
          key: 'team_2_max_deaths',
          width: 10,
        },
        {
          header: '最后被击杀英雄位置',
          key: 'last_killed_role',
          width: 18,
        },
        {
          header: '时间',
          key: 'game_time',
          width: 11,
        },
        {
          header: '一血时间',
          key: 'first_blood_game_time',
          width: 11,
        },
        {
          header: '获得一血位置',
          key: 'first_blood_killer_role',
          width: 10,
        },
        {
          header: '交出一血位置',
          key: 'first_blood_killed_role',
          width: 10,
        },
        {
          header: '三杀',
          key: 'is_triple_kills',
          width: 10,
        },
        {
          header: '四杀',
          key: 'is_quadra_kills',
          width: 10,
        },
        {
          header: '团灭次数',
          key: 'team_destroyed_count_num',
          width: 10,
        },
        {
          header: '蓝方首选英雄',
          key: 'blue_pick_n_1_champion',
          width: 10,
        },
        {
          header: '红方首选英雄',
          key: 'red_pick_n_1_champion',
          width: 10,
        },
        {
          header: '首队累计5次击杀时最高的杀敌',
          key: 'race_to_5_kills_player_max_kills',
          width: 10,
        },
        {
          header: '首队累计10次击杀时最高的杀敌',
          key: 'race_to_10_kills_player_max_kills',
          width: 10,
        },
        {
          header: '赢得先机队伍',
          key: 'feats_of_strength_team_name',
          width: 14,
        },
      ],
      data: [],
    },
    {
      fetchUrl: '',
      fetchOptions: {},
      sheetName: '表格1',
      columns: [
        {
          header: '姓名',
          key: 'name',
          width: 10,
        },
        {
          header: '年龄',
          key: 'age',
          width: 10,
        },
        {
          header: '状态',
          key: 'status',
          width: 10,
        },
      ],
      data: [],
    },
  ],
};
