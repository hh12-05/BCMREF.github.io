// 상태 관리
let currentMode = 'weapon';
let selectedWeapons = [];

// 초기화
function init() {
    renderWeapons();
    renderRegions();
    setupModeSwitch();
}

// 지역 정보 렌더링
function renderRegions() {
    const container = document.getElementById('region-list');
    container.innerHTML = '';
    container.className = '';

    // 그룹 정의
    const groups = {
        '4번 협곡': ['거점 지역', '오리지늄 연구 구역', '광맥 구역', '에너지 공급 고지'],
        '무릉': ['무릉성']
    };

    Object.entries(groups).forEach(([groupName, regionNames]) => {
        // 그룹 제목 생성
        const title = document.createElement('h3');
        title.className = 'region-group-title';
        title.textContent = groupName;

        // Design RGB Code Application
        const groupColors = {
            '4번 협곡': '#fffb74',
            '무릉': '#69fdc7'
        };
        if (groupColors[groupName]) {
            title.style.color = groupColors[groupName];
            title.style.borderLeftColor = groupColors[groupName];
            title.style.textShadow = `0 0 10px ${groupColors[groupName]}40`;
        }

        container.appendChild(title);

        // 해당 그룹의 그리드 컨테이너 생성
        const grid = document.createElement('div');
        grid.className = 'region-grid';

        // 해당 그룹에 속하는 지역 필터링 및 렌더링
        const groupRegions = regionInfoData.filter(r => regionNames.includes(r.name));

        if (groupRegions.length === 0) return;

        groupRegions.forEach(region => {
            const card = document.createElement('div');
            card.className = 'region-card-info';

            const extraTags = region.extra.map(tag => `<span class="drop-tag extra">${tag}</span>`).join('');
            const skillTags = region.skill.map(tag => `<span class="drop-tag skill">${tag}</span>`).join('');

            card.innerHTML = `
                <div class="region-name">${region.name}</div>
                <div class="drop-section" style="background: rgba(255, 255, 255, 0.05); padding: 10px; border-radius: 8px; border: 1px solid var(--steel-shine);">
                    <div class="drop-title" style="color: var(--steel-shine); font-size: 1.1em;">⭐ 추천 파밍 조합</div>
                    <div class="drop-tags" style="color: var(--white); font-weight: bold;">${region.bestCombo}</div>
                    <div style="margin-top: 8px; font-size: 0.9em; color: var(--text-secondary); border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 5px;">
                        <div style="margin-bottom: 4px;"><span style="color: var(--steel-shine);">획득 가능(6★):</span> ${region.bestWeapons.join(', ')}</div>
                        ${region.bestWeapons5 && region.bestWeapons5.length > 0 ? `
                        <div><span style="color: #a0aec0;">획득 가능(5★):</span> ${region.bestWeapons5.join(', ')}</div>
                        ` : ''}
                    </div>
                </div>
                <div class="drop-section">
                    <div class="drop-title">추가 속성</div>
                    <div class="drop-tags">${extraTags}</div>
                </div>
                <div class="drop-section">
                    <div class="drop-title">스킬 속성</div>
                    <div class="drop-tags">${skillTags}</div>
                </div>
            `;
            grid.appendChild(card);
        });

        container.appendChild(grid);
    });
}

// 무기 렌더링
// 무기 필터링 UI 및 로직
let weaponFilters = { category: [], rarity: [], basic: [], additional: [], skill: [] };

// 필터 UI 추가 (처음 렌더링 시 한 번만)
function createFilterUI() {
    const weaponModeDiv = document.getElementById('weapon-mode');
    if (!document.getElementById('weapon-filters')) {
        const filterDiv = document.createElement('div');
        filterDiv.id = 'weapon-filters';
        filterDiv.className = 'selection-area';
        filterDiv.style.marginBottom = '20px';
        filterDiv.style.padding = '20px';

        // 디자인 RGB 코드 적용
        const colorMap = {
            '열기 피해 증가': '#ff613d', '자연 피해 증가': '#9eda23', '물리 피해 증가': '#fffdfd', '냉기 피해 증가': '#21c5cf', '전기 피해 증가': '#fdbe02',
            '효율': '#91ee9d', '치유 효율 증가': '#91ee9d',
            '어둠': '#faed7b', '억제': '#faed7b', '흐름': '#faed7b', '추격': '#faed7b',
            '방출': '#5DDEF4', '고통': '#5DDEF4',
            '기예': '#f4aca3', '강공': '#f4aca3',
            '잔혹': '#AAB7B8', '골절': '#AAB7B8', '사기': '#AAB7B8', '분쇄': '#AAB7B8'
        };

        const createFilterGroup = (label, type, items, labelMapper = null) => `
            <div class="filter-group" style="margin-bottom: 15px;">
                <div style="color: var(--text-secondary); font-size: 0.9em; margin-bottom: 8px; font-weight: 600;">${label}</div>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${items.map(item => {
            const name = labelMapper ? labelMapper(item) : item;
            const color = colorMap[item];
            let style = "";
            if (color) {
                style = `style="color: ${color}; border-color: ${color}40; box-shadow: 0 0 5px ${color}20;"`;
            }
            return `<div class="filter-chip" ${style} onclick="toggleWeaponFilter('${type}', '${item}', this)">${name}</div>`
        }).join('')}
                </div>
            </div>
        `;

        const rarities = [6, 5];
        const categories = Object.keys(weaponData);

        filterDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; cursor: pointer; user-select: none;" onclick="toggleFilterVisibility()">
                <div style="font-weight: 700; color: var(--white); display: flex; align-items: center; gap: 10px; font-size: 1.1em;">
                    <span>🔍 무기 검색 필터</span>
                    <span id="filter-toggle-icon" style="transition: transform 0.3s ease;">▼</span>
                </div>
            </div>
            <div id="filter-content" style="display: block; transition: all 0.3s ease;">
                <div style="display: flex; flex-direction: column;">
                    ${createFilterGroup('무기 종류', 'category', categories)}
                    ${createFilterGroup('성급 (희귀도)', 'rarity', rarities, r => r + '성')}
                    ${createFilterGroup('기초 속성', 'basic', attributeData.basic)}
                    ${createFilterGroup('추가 속성', 'additional', attributeData.additional)}
                    ${createFilterGroup('스킬 속성', 'skill', attributeData.skill)}
                    <button onclick="resetWeaponFilters()" style="margin-top: 15px; padding: 8px 20px; background: rgba(255,255,255,0.1); color: var(--text-secondary); border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; cursor: pointer; align-self: flex-start; font-size: 0.9em;">필터 초기화</button>
                </div>
            </div>
        `;

        const title = weaponModeDiv.querySelector('.section-title');
        title.insertAdjacentElement('afterend', filterDiv);
    }
}

function toggleFilterVisibility() {
    const content = document.getElementById('filter-content');
    const icon = document.getElementById('filter-toggle-icon');
    if (content.style.display === 'none') {
        content.style.display = 'block';
        icon.style.transform = 'rotate(0deg)';
    } else {
        content.style.display = 'none';
        icon.style.transform = 'rotate(-90deg)';
    }
}

function toggleWeaponFilter(type, val, btn) {
    const idx = weaponFilters[type].indexOf(val);
    if (idx > -1) {
        weaponFilters[type].splice(idx, 1);
        btn.classList.remove('active');
    } else {
        weaponFilters[type].push(val);
        btn.classList.add('active');
    }
    filterWeapons();
}

// 무기 필터링 로직
function filterWeapons() {
    // Section visibility counters
    const sectionVisibility = {
        '한손검': { id: 'onehanded-weapons', count: 0 },
        '양손검': { id: 'twohanded-weapons', count: 0 },
        '장병기': { id: 'polearm-weapons', count: 0 },
        '권총': { id: 'pistol-weapons', count: 0 },
        '아츠 유닛': { id: 'arts-weapons', count: 0 }
    };

    // Iterate all weapon items
    const allWeaponBoxes = document.querySelectorAll('.weapon-box');
    allWeaponBoxes.forEach(box => {
        const name = box.querySelector('.weapon-name').childNodes[0].textContent.trim();
        // Find data object
        let weaponObj = null;
        let category = '';
        for (const cat in weaponData) {
            const found = weaponData[cat].find(w => w.name === name);
            if (found) {
                weaponObj = found;
                category = cat;
                break;
            }
        }

        if (!weaponObj) return;

        let match = true;
        if (weaponFilters.category.length > 0 && !weaponFilters.category.includes(category)) match = false;
        if (weaponFilters.rarity.length > 0 && !weaponFilters.rarity.includes(weaponObj.rarity.toString())) match = false;
        if (weaponFilters.basic.length > 0 && !weaponFilters.basic.includes(weaponObj.basic)) match = false;
        if (weaponFilters.additional.length > 0 && !weaponFilters.additional.includes(weaponObj.additional)) match = false;
        if (weaponFilters.skill.length > 0 && !weaponFilters.skill.includes(weaponObj.skill)) match = false;

        // Toggle visibility
        box.style.display = match ? 'block' : 'none';
        if (match) {
            sectionVisibility[category].count++;
        }
    });

    // Update Section Visibility (Header + Grid)
    Object.keys(sectionVisibility).forEach(cat => {
        const info = sectionVisibility[cat];
        const grid = document.getElementById(info.id);
        if (grid) {
            const title = grid.previousElementSibling; // The H3 title
            if (info.count > 0) {
                grid.style.display = 'flex';
                if (title) title.style.display = 'block';
            } else {
                grid.style.display = 'none';
                if (title) title.style.display = 'none';
            }
        }
    });
}

function resetWeaponFilters() {
    weaponFilters = { category: [], rarity: [], basic: [], additional: [], skill: [] };
    document.querySelectorAll('.filter-chip').forEach(el => el.classList.remove('active'));
    filterWeapons();
}

function renderWeapons() {
    createFilterUI(); // Ensure filter UI exists
    Object.keys(weaponData).forEach(category => {
        const containerId = category === '한손검' ? 'onehanded-weapons' :
            category === '양손검' ? 'twohanded-weapons' :
                category === '장병기' ? 'polearm-weapons' :
                    category === '권총' ? 'pistol-weapons' : 'arts-weapons';
        const container = document.getElementById(containerId);
        container.innerHTML = ''; // Clear existing content

        weaponData[category].forEach(weapon => {
            const weaponBox = document.createElement('div');
            weaponBox.className = 'weapon-box';

            const basic = weapon.basic || '';
            const additional = weapon.additional || '';
            const skill = weapon.skill || '';

            const statsHtml = (basic || additional || skill) ?
                `<div class="weapon-stats">${basic}${basic && (additional || skill) ? ' / ' : ''}${additional}${additional && skill ? ' / ' : ''}${skill}</div>` : '';

            weaponBox.innerHTML = `
                <div class="weapon-name">
                    ${weapon.name}
                    <span class="rarity-label rarity-${weapon.rarity}">★${weapon.rarity}</span>
                    ${weapon.owner ? `<span class="rarity-label rarity-owner">${weapon.owner}</span>` : ''}
                </div>
                ${statsHtml}
            `;
            weaponBox.onclick = () => toggleWeapon(weapon.name, weaponBox);
            container.appendChild(weaponBox);
        });
    });
}


// 탭 전환 설정
function setupModeSwitch() {
    const btns = document.querySelectorAll('.mode-btn');
    const weaponMode = document.getElementById('weapon-mode');
    const regionMode = document.getElementById('region-mode');
    const resultArea = document.getElementById('results');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update buttons
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 선택 초기화
            clearSelections();

            // Update state
            currentMode = btn.dataset.mode;

            // Hide all sections first
            weaponMode.style.display = 'none';
            regionMode.style.display = 'none';
            resultArea.style.display = 'none'; // Hide results on switch

            // Show selected section
            if (currentMode === 'weapon') {
                weaponMode.style.display = 'block';
            } else if (currentMode === 'region') {
                regionMode.style.display = 'block';
            }
        });
    });
}

// 무기 선택/해제
function toggleWeapon(weaponName, element) {
    const index = selectedWeapons.indexOf(weaponName);
    if (index > -1) {
        selectedWeapons.splice(index, 1);
        element.classList.remove('selected');
    } else {
        selectedWeapons.push(weaponName);
        element.classList.add('selected');
    }
    calculateResults();
}

// 선택 초기화
function clearSelections() {
    selectedWeapons = [];
    document.querySelectorAll('.weapon-box.selected')
        .forEach(el => el.classList.remove('selected'));
    document.getElementById('results').classList.remove('show');
}

// 결과 계산
function calculateResults() {
    let results = [];
    const resultArea = document.getElementById('results');

    if (currentMode === 'weapon') {
        if (selectedWeapons.length === 0) {
            resultArea.style.display = 'none';
            return;
        }
        results = findRegionsByWeapons(selectedWeapons);
    }

    displayResults(results);
}

// 조합 생성 헬퍼
function getCombinations(arr, size) {
    const results = [];
    if (size === 1) return arr.map(value => [value]);
    arr.forEach((fixed, index, origin) => {
        const rest = origin.slice(index + 1);
        const combinations = getCombinations(rest, size - 1);
        const attached = combinations.map(combination => [fixed, ...combination]);
        results.push(...attached);
    });
    return results;
}

// 무기로 지역 찾기 (조건: 3기초 + 1추가/스킬, 선택 무기 포함 + 다른 무기 표시)
function findRegionsByWeapons(weapons) {
    const results = [];
    const allWeapons = [];
    Object.values(weaponData).forEach(list => allWeapons.push(...list));

    // 각 지역별 가능한 모든 조합(Configs) 중, 선택된 무기와 일치하는 것이 있는지 확인
    regionInfoData.forEach(region => {
        const regionBasics = region.basics;
        const regionSubs = [...region.extra, ...region.skill]; // 추가 속성 + 스킬 속성

        // 1. 해당 지역의 기초 속성 중 3개를 뽑는 모든 조합 생성
        const basicCombos = getCombinations(regionBasics, 3);

        // 2. [기초3개 + 서브1개] 구성을 생성하고 유효성 검사
        basicCombos.forEach(basicSet => {
            regionSubs.forEach(sub => {
                // 이 구성(Config)이 유효한지 체크 (선택된 무기 중 하나라도 이 구성을 만족하는가?)
                const triggeringWeapons = weapons.filter(wName => {
                    const w = allWeapons.find(x => x.name === wName);
                    if (!w) return false;

                    const wAdd = w.additional;
                    const wBasic = w.basic;
                    const wSkill = w.skill;

                    // Match logic
                    const matchSub = (sub === wAdd) || (sub === wSkill);
                    const matchBasic = basicSet.includes(wBasic);

                    // Condition 4: Strict Region Match (All attributes must be in region)
                    const strictRegionMatch = region.basics.includes(wBasic) &&
                        region.extra.includes(wAdd) &&
                        region.skill.includes(w.skill);

                    return matchSub && matchBasic && strictRegionMatch;
                });

                if (triggeringWeapons.length > 0) {
                    // 유효한 구성임! 결과 생성 (Delimiter: |)
                    const comboStr = `${basicSet.join('|')}|${sub}`;

                    // "선택하지 않은 다른 모든 무기가 표기되어야 한다"
                    const validWeaponsForConfig = allWeapons.filter(w => {
                        const wAdd = w.additional;
                        const wBasic = w.basic;
                        const wSkill = w.skill;

                        const matchSub = (sub === wAdd) || (sub === wSkill);
                        const matchBasic = basicSet.includes(wBasic);

                        // Condition 4: Strict Region Match
                        const strictRegionMatch = region.basics.includes(wBasic) &&
                            region.extra.includes(wAdd) &&
                            region.skill.includes(w.skill);

                        return matchSub && matchBasic && strictRegionMatch;
                    });

                    const sixStars = validWeaponsForConfig.filter(w => w.rarity === 6).map(w => w.name);
                    const fiveStars = validWeaponsForConfig.filter(w => w.rarity === 5).map(w => w.name);

                    if (sixStars.length > 0 || fiveStars.length > 0) {
                        const usedBasics = new Set();
                        validWeaponsForConfig.forEach(w => {
                            usedBasics.add(w.basic);
                        });
                        const activeCount = usedBasics.size;
                        const activeBasicsList = Array.from(usedBasics).sort();

                        results.push({
                            region: region.name,
                            combo: comboStr,
                            subAttribute: sub,
                            activeBasicsKey: activeBasicsList.join(','),
                            weapons: sixStars,
                            fiveStars: fiveStars,
                            activeBasicCount: activeCount,
                            sixStarCount: sixStars.length,
                            fiveStarCount: fiveStars.length
                        });
                    }
                }
            });
        });
    });

    // 중복 제거
    const uniqueResults = [];
    const seenSignatures = new Set();

    results.forEach(result => {
        const signature = `${result.region}|${result.subAttribute}|${result.activeBasicsKey}`;
        if (!seenSignatures.has(signature)) {
            seenSignatures.add(signature);
            uniqueResults.push(result);
        }
    });

    // 정렬
    uniqueResults.sort((a, b) => {
        if (b.activeBasicCount !== a.activeBasicCount) return b.activeBasicCount - a.activeBasicCount;
        if (b.sixStarCount !== a.sixStarCount) return b.sixStarCount - a.sixStarCount;
        return b.fiveStarCount - a.fiveStarCount;
    });

    return uniqueResults;
}

// 결과 표시
function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.style.display = '';

    // Generate Selection Summary & Prepare Highlight List
    let selectionSummary = '';
    let highlightList = [];

    if (currentMode === 'weapon') {
        highlightList = selectedWeapons;
        selectionSummary = `<div class="selection-summary" style="margin-bottom: 20px; padding: 15px; background: rgba(0,0,0,0.2); border-left: 3px solid var(--steel-shine); border-radius: 4px;">
                                <div style="font-size: 0.85em; color: var(--text-secondary); margin-bottom: 5px;">검색 조건 (무기)</div>
                                <div style="color: var(--white); font-weight: 600;">${selectedWeapons.join(', ')}</div>
                            </div>`;
    }

    if (results.length === 0) {
        resultsDiv.innerHTML = selectionSummary + '<div class="no-results">매칭되는 파밍 지역이 없습니다.</div>';
        resultsDiv.classList.add('show');
        return;
    }

    // Group by region to show one card per region
    const regionOrder = [];
    const grouped = {};

    results.forEach(result => {
        if (!grouped[result.region]) {
            grouped[result.region] = [];
            regionOrder.push(result.region);
        }
        grouped[result.region].push(result);
    });

    let html = selectionSummary;
    const canyonRegions = ['거점 지역', '오리지늄 연구 구역', '광맥 구역', '에너지 공급 고지'];

    regionOrder.forEach(regionName => {
        const groupItems = grouped[regionName];
        const themeClass = canyonRegions.includes(regionName) ? 'canyon' : '';

        html += `<div class="result-card ${themeClass}">
                    <div class="result-region">${regionName}</div>
                    <div style="display: flex; flex-wrap: wrap; gap: 15px;">`;

        groupItems.forEach(result => {
            // 1. Gather all weapons in this result
            const resultWeaponNames = [...result.weapons, ...result.fiveStars];

            // 2. Identify their Basic Attributes
            const activeBasics = new Set();
            const allWeapons = [];
            Object.values(weaponData).forEach(l => allWeapons.push(...l));

            resultWeaponNames.forEach(name => {
                const w = allWeapons.find(x => x.name === name);
                if (w) {
                    activeBasics.add(w.basic);
                }
            });

            const basicList = ['힘', '민첩', '지능', '의지', '주요 능력치'];

            const rawParts = result.combo.split('|');
            const styledParts = rawParts.map(part => {
                if (basicList.includes(part)) {
                    // It is a basic attribute
                    if (activeBasics.has(part)) {
                        // Used by at least one weapon in this box -> Bright
                        return `<span style="color: #fff; font-weight: 600;">${part}</span>`;
                    } else {
                        // Unused in this box -> Dim
                        return `<span style="opacity: 0.35;">${part}</span>`;
                    }
                } else {
                    // Sub attribute -> Standard styled
                    return `<span>${part}</span>`;
                }
            });

            let displayCombo = "";
            if (styledParts.length >= 2) {
                const last = styledParts.pop();
                displayCombo = styledParts.join(', ') + ' + ' + last;
            } else {
                displayCombo = styledParts.join('');
            }

            // Helper to highlight weapon tag
            const renderWeaponTag = (w, isFiveStar = false) => {
                const isSelected = selectedWeapons.includes(w);
                const style = isSelected
                    ? 'border-color: #ffd700; box-shadow: 0 0 8px rgba(255, 215, 0, 0.4);'
                    : '';
                const className = isFiveStar ? 'weapon-tag five-star' : 'weapon-tag';
                return `<span class="${className}" style="${style}">${w}</span>`;
            };

            html += `
                <div class="combo-block">
                    <div class="result-combo">
                        ${displayCombo}
                    </div>
                    <div style="padding: 0 5px;">
                        <div class="result-weapons">
                            <div class="result-weapons-title" style="color: #FFD700; opacity: 0.8; margin-bottom: 8px; font-size: 0.8em; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">6 Star Weapons</div>
                            <div class="weapon-list" style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px;">
                                ${result.weapons.map(w => renderWeaponTag(w)).join('')}
                            </div>
                        </div>
                        ${result.fiveStars.length > 0 ? `
                        <div class="result-weapons">
                            <div class="result-weapons-title" style="color: #A0AEC0; opacity: 0.8; margin-bottom: 8px; font-size: 0.8em; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">5 Star Weapons</div>
                            <div class="weapon-list" style="display: flex; flex-wrap: wrap; gap: 6px;">
                                ${result.fiveStars.map(w => renderWeaponTag(w, true)).join('')}
                            </div>
                        </div>
                        ` : ''}
                    </div>
                </div>
            `;
        });

        html += `</div></div>`;
    });

    resultsDiv.innerHTML = html;
    resultsDiv.classList.add('show');
}

window.onscroll = function () { scrollFunction() };
function scrollFunction() {
    const btn = document.getElementById("scrollTopBtn");
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
}
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 초기화 실행
init();
