// 데이터 정의 (풀네임 적용 완료)
const weaponData = {
    '한손검': [
        { name: '용조의 불꽃', owner: '레바테인', rarity: 6, basic: '지능', additional: '공격력 증가', skill: '어둠' },
        { name: '끝없는 방랑', owner: '포그라니치니크', rarity: 6, basic: '의지', additional: '공격력 증가', skill: '흐름' },
        { name: '부요', owner: '진천우', rarity: 6, basic: '주요 능력치', additional: '치명타 확률 증가', skill: '어둠' },
        { name: '장대한 염원', owner: '관리자', rarity: 6, basic: '민첩', additional: '공격력 증가', skill: '고통' },
        { name: '암흑의 횃불', owner: '', rarity: 6, basic: '지능', additional: '열기 피해 증가', skill: '고통' },
        { name: '테르밋 커터', owner: '', rarity: 6, basic: '의지', additional: '공격력 증가', skill: '흐름' },
        { name: '위대한 이름', owner: '', rarity: 6, basic: '주요 능력치', additional: '물리 피해 증가', skill: '잔혹' },
        { name: '백야의 별', owner: '', rarity: 6, basic: '주요 능력치', additional: '오리지늄 아츠 강도 증가', skill: '고통' },
        { name: '십이문', owner: '', rarity: 5, basic: '민첩', additional: '공격력 증가', skill: '고통' },
        { name: '린수를 찾아서', owner: '', rarity: 5, basic: '힘', additional: '냉기 피해 증가', skill: '억제' },
        { name: '불사의 성주', owner: '', rarity: 5, basic: '지능', additional: '궁극기 획득 효율 증가', skill: '사기' },
        { name: '숭배의 시선', owner: '', rarity: 5, basic: '민첩', additional: '물리 피해 증가', skill: '어둠' },
        { name: '강철의 여운', owner: '', rarity: 5, basic: '민첩', additional: '물리 피해 증가', skill: '기예' },
        { name: 'OBJ 한손검', owner: '', rarity: 5, basic: '민첩', additional: '공격력 증가', skill: '흐름' }
    ],
    '양손검': [
        { name: '헤라펜거', owner: '라스트 라이트', rarity: 6, basic: '힘', additional: '공격력 증가', skill: '방출' },
        { name: '천둥의 흔적', owner: '엠버', rarity: 6, basic: '힘', additional: '생명력 증가', skill: '의료' },
        { name: '분쇄의 군주', owner: '', rarity: 6, basic: '힘', additional: '치명타 확률 증가', skill: '분쇄' },
        { name: '과거의 일품', owner: '', rarity: 6, basic: '의지', additional: '생명력 증가', skill: '효율' },
        { name: '모범', owner: '', rarity: 6, basic: '주요 능력치', additional: '공격력 증가', skill: '억제' },
        { name: '최후의 메아리', owner: '', rarity: 5, basic: '힘', additional: '생명력 증가', skill: '의료' },
        { name: '검은 추적자', owner: '', rarity: 5, basic: '힘', additional: '궁극기 획득 효율 증가', skill: '방출' },
        { name: '고대의 강줄기', owner: '', rarity: 5, basic: '힘', additional: '오리지늄 아츠 강도 증가', skill: '잔혹' },
        { name: 'OBJ 양손검', owner: '', rarity: 5, basic: '힘', additional: '생명력 증가', skill: '효율' }
    ],
    '장병기': [
        { name: 'J.E.T.', owner: '아비웨나', rarity: 6, basic: '주요 능력치', additional: '공격력 증가', skill: '억제' },
        { name: '산의 지배자', owner: '여풍', rarity: 6, basic: '민첩', additional: '물리 피해 증가', skill: '효율' },
        { name: '용사', owner: '', rarity: 6, basic: '민첩', additional: '물리 피해 증가', skill: '기예' },
        { name: '중심력', owner: '', rarity: 5, basic: '의지', additional: '전기 피해 증가', skill: '억제' },
        { name: '키메라', owner: '', rarity: 5, basic: '힘', additional: '궁극기 획득 효율 증가', skill: '잔혹' },
        { name: 'OBJ 장병기', owner: '', rarity: 5, basic: '의지', additional: '물리 피해 증가', skill: '고통' }
    ],
    '권총': [
        { name: '예술의 폭군', owner: '이본', rarity: 6, basic: '지능', additional: '치명타 확률 증가', skill: '골절' },
        { name: '클래니벌', owner: '울프가드', rarity: 6, basic: '주요 능력치', additional: '아츠 피해 증가', skill: '고통' },
        { name: '항로의 개척자', owner: '', rarity: 6, basic: '지능', additional: '냉기 피해 증가', skill: '고통' },
        { name: '쐐기', owner: '', rarity: 6, basic: '주요 능력치', additional: '치명타 확률 증가', skill: '고통' },
        { name: '이성적인 작별', owner: '', rarity: 5, basic: '힘', additional: '열기 피해 증가', skill: '추격' },
        { name: '작품: 중생', owner: '', rarity: 5, basic: '민첩', additional: '아츠 피해 증가', skill: '고통' },
        { name: 'OBJ 권총', owner: '', rarity: 5, basic: '민첩', additional: '궁극기 획득 효율 증가', skill: '방출' }
    ],
    '아츠 유닛': [
        { name: '바다와 별의 꿈', owner: '아델리아', rarity: 6, basic: '지능', additional: '치유 효율 증가', skill: '고통' },
        { name: '사명의 길', owner: '질베르타', rarity: 6, basic: '의지', additional: '궁극기 획득 효율 증가', skill: '추격' },
        { name: '기사도 정신', owner: '', rarity: 6, basic: '의지', additional: '생명력 증가', skill: '의료' },
        { name: '폭발 유닛', owner: '', rarity: 6, basic: '주요 능력치', additional: '오리지늄 아츠 강도 증가', skill: '방출' },
        { name: '망각', owner: '', rarity: 6, basic: '지능', additional: '아츠 피해 증가', skill: '어둠' },
        { name: '작품: 침식 흔적', owner: '', rarity: 6, basic: '의지', additional: '자연 피해 증가', skill: '억제' },
        { name: '선교의 자유', owner: '', rarity: 5, basic: '의지', additional: '치유 효율 증가', skill: '의료' },
        { name: '황무지의 방랑자', owner: '', rarity: 5, basic: '지능', additional: '전기 피해 증가', skill: '고통' },
        { name: '무가내하', owner: '', rarity: 5, basic: '의지', additional: '궁극기 획득 효율 증가', skill: '사기' },
        { name: '망자의 노래', owner: '', rarity: 5, basic: '지능', additional: '공격력 증가', skill: '어둠' },
        { name: 'OBJ 아츠 유닛', owner: '', rarity: 5, basic: '지능', additional: '오리지늄 아츠 강도 증가', skill: '추격' }
    ]
};

const attributeData = {
    basic: ['힘', '민첩', '지능', '의지', '주요 능력치'],
    additional: ['공격력 증가', '생명력 증가', '물리 피해 증가', '열기 피해 증가', '전기 피해 증가', '냉기 피해 증가', '자연 피해 증가', '치명타 확률 증가', '궁극기 획득 효율 증가', '오리지늄 아츠 강도 증가', '아츠 피해 증가', '치유 효율 증가'],
    skill: ['강공', '기예', '어둠', '억제', '흐름', '추격', '효율', '의료', '방출', '고통', '잔혹', '골절', '사기', '분쇄']
};

// 지역별 드랍 데이터
const regionInfoData = [
    {
        name: '거점 지역',
        basics: ['힘', '민첩', '의지', '주요 능력치'],
        extra: ['공격력 증가', '열기 피해 증가', '전기 피해 증가', '냉기 피해 증가', '자연 피해 증가', '오리지늄 아츠 강도 증가', '궁극기 획득 효율 증가', '아츠 피해 증가'],
        skill: ['강공', '억제', '추격', '분쇄', '기예', '방출', '흐름', '효율'],
        bestCombo: '힘, 의지, 주요 능력치 + 공격력 증가',
        bestWeapons: ['끝없는 방랑', '테르밋 커터', '헤라펜거', '모범', 'J.E.T.'],
        bestWeapons5: []
    },
    {
        name: '오리지늄 연구 구역',
        basics: ['민첩', '지능', '의지', '주요 능력치'],
        extra: ['공격력 증가', '물리 피해 증가', '전기 피해 증가', '냉기 피해 증가', '자연 피해 증가', '치명타 확률 증가', '궁극기 획득 효율 증가', '아츠 피해 증가'],
        skill: ['억제', '추격', '사기', '기예', '고통', '의료', '골절', '효율'],
        bestCombo: '민첩, 지능, 주요 능력치 + 고통',
        bestWeapons: ['장대한 염원', '클래니벌', '항로의 개척자', '쐐기'],
        bestWeapons5: ['십이문', '작품: 중생', '황무지의 방랑자']
    },
    {
        name: '광맥 구역',
        basics: ['힘', '민첩', '지능', '의지', '주요 능력치'],
        extra: ['생명력 증가', '물리 피해 증가', '열기 피해 증가', '냉기 피해 증가', '자연 피해 증가', '치명타 확률 증가', '오리지늄 아츠 강도 증가', '치유 효율 증가'],
        skill: ['강공', '억제', '기예', '잔혹', '고통', '방출', '어둠', '효율'],
        bestCombo: '지능, 의지, 주요 능력치 + 고통',
        bestWeapons: ['암흑의 횃불', '백야의 별', '항로의 개척자', '쐐기', '바다와 별의 꿈'],
        bestWeapons5: ['OBJ 장병기']
    },
    {
        name: '에너지 공급 고지',
        basics: ['힘', '민첩', '지능', '의지', '주요 능력치'],
        extra: ['공격력 증가', '생명력 증가', '물리 피해 증가', '열기 피해 증가', '자연 피해 증가', '치명타 확률 증가', '오리지늄 아츠 강도 증가', '치유 효율 증가'],
        skill: ['추격', '분쇄', '사기', '잔혹', '고통', '의료', '골절', '흐름'],
        bestCombo: '민첩, 지능, 주요 능력치 + 고통',
        bestWeapons: ['장대한 염원', '암흑의 횃불', '백야의 별', '쐐기', '바다와 별의 꿈'],
        bestWeapons5: ['십이문']
    },
    {
        name: '무릉성',
        basics: ['힘', '민첩', '지능', '의지', '주요 능력치'],
        extra: ['공격력 증가', '생명력 증가', '전기 피해 증가', '냉기 피해 증가', '치명타 확률 증가', '궁극기 획득 효율 증가', '아츠 피해 증가', '치유 효율 증가'],
        skill: ['강공', '분쇄', '잔혹', '의료', '골절', '방출', '어둠', '흐름'],
        bestCombo: '힘, 지능, 의지 + 공격력 증가',
        bestWeapons: ['용조의 불꽃', '끝없는 방랑', '테르밋 커터', '헤라펜거'],
        bestWeapons5: ['망자의 노래']
    }
];
