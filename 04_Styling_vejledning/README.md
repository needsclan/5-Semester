# React Native Styling Vejledning

I denne opgave skal du lære om styling i React Native. Vi vil starte med at læse dokumentationen om emnet og derefter klone et givet repository for at undersøge en eksisterende app.

## Del 1 - Læsning af Dokumentation

Først skal du læse den nødvendige dokumentation, som vil hjælpe dig med at forstå, hvordan styling fungerer i React Native. Sørg for at gennemgå begge links, da de vil være vigtige for at forstå opgaven.

- [Style documentation](https://reactnative.dev/docs/style)
- [StyleSheet documentation](https://reactnative.dev/docs/stylesheet)

## Del 2 - Clone Repo
### Del 2.1 - Clone Repo ved at downloade fra github
1. Gå ind på vores github: https://github.com/CBS-INNT

2. Find det ønskede repo

3. Klik på den grønne knap, hvor der står "code" og downloade zipfilen

4. Gem zipfilen et sted og åben den i VSC

### Del 2.2 - Clone Repo med Git i terminalen

Når du har læst dokumentationen, skal du klone det givet repository ned på din computer. Følg nedenstående trin:

1. Åbn terminalen på din computer.
2. Naviger til den ønskede mappe, hvor du vil klone repo'et, f.eks.:
    ```
    cd path/to/your/folder
    ```

3. Brug følgende Git-kommando til at klone repo'et:
    ```
    git clone https://github.com/CBS-INNT/04_Styling_vejledning.git
    ```

4. Naviger ind i den klonede mappe:
    ```
    cd 04_Styling_vejledning
    ```

## Del 3 - Start App'en

Nu skal du starte app'en både på din computer og din mobil, så du kan udforske, hvordan den fungerer og ser ud.

1. Installere de nødvendige pakker med `npm install`. Hvis du er nysgerrig på hvilke pakker der bliver installeret, så kan du se dem i din `package.json` fil under `"dependencies"`. 
Hvis det ikke virker så installere også følgende:
    ```
    npx expo install @react-navigation/native
    npx expo install @react-navigation/native-stack
    npx expo install @react-navigation/bottom-tabs
    npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-get-random-values
    ```

2. Start med at køre app'en i udviklingsmiljøet ved at bruge følgende kommando:
    ```
    npx expo start
    ```
    Hvis du oplever problemer fordi du fx er på eduroam så kør følgende kommando:
     ```
    npx expo start --tunnel
    ```

2. Scan QR-koden med din mobil, eller brug en emulator for at se app'en køre live.

3. Brug lidt tid på at navigere rundt i app'en, og prøv at identificere og eksperimentere med de forskellige stylingelementer der bruges.


## Del 4 - Push det klonet repo til eget GitHub repository

Nu skal du oprette et nyt repository på din egen GitHub-konto, så du kan pushe dine ændringer dertil.

### Del 4.1 - Push via Github Desktop
1. Åben Github Desktop.
2. Klik på `Current repository` og derefter på `Add` og så på `Add Existing Repository`.
3. Find din mappe og tilføj den
4. Klik på `Publish Repository`

### Del 4.2 - Push via terminalen
#### Step 1 - Opret et nyt repository på GitHub

1. Gå til [GitHub](https://github.com) og log ind på din konto.
2. Klik på "New" for at oprette et nyt repository.
3. Giv dit repository et navn, f.eks. `04_Styling`.
4. Sørg for, at det er et **public** eller **private** repository, alt efter hvad du ønsker.
5. Klik på "Create repository".

#### Step 2 - Opdater Git remote for dit lokale projekt

1. Åbn terminalen i din klonede mappe, hvis den ikke allerede er åben:
    ```
    cd path/to/your/cloned/repo
    ```

2. Fjern den eksisterende remote, så du ikke pusher ændringer til det oprindelige repository:
    ```
    git remote remove origin
    ```

3. Tilføj din egen GitHub-repo som ny remote:
    ```
    git remote add origin https://github.com/<dit-brugernavn>/<dit-repo-navn>.git
    ```
    Dette link finder du på dit nyoprettet repo

#### Step 3 - Push til dit nye GitHub repository

1. Check om git tracker dine ændringer med : 
```
git status
```
Her skulle du gerne se alle dine filer være <font color="red">røde</font>.

2. Tilføj alle ændringer til staging:
 ```
 git add .
 ```

3. Check igen om dine ændringer er staged med `git status`. Nu skulle dine filer gerne være <font color="green">grønne</font>.

2. Lav en commit med en besked:
 ```
 git commit -m "Initial commit with cloned repo"
 ```

3. Push til dit nye GitHub repository:
 ```
 git push -u origin main
 ```

#### Step 4 - Bekræft ændringer

1. Gå til dit GitHub repository på [github.com](https://github.com).
2. Tjek, at alle filerne fra dit lokale projekt er blevet pushed til dit nye repository.


Nu har du klonet det fælles repo og pushet det op til dit eget GitHub repository. Vi er nu klar til at lege med styling!


# Styling med React Native

Nu skal vi arbejde med at style appen, så den ser flot ud og har en professionel følelse. Du har allerede fået en del af styles i din **GlobalStyle.js**, men nu skal du opdatere dem for at få appen til at se endnu bedre ud!

Når man styler ens app, er det ligesom når du styler resten af dit liv - det ser bare bedre ud når man har en flot farve palet! Et rigtig godt design værktøj man kan bruge til dette er : https://coolors.co/. Gå ind på værktøjet og leg med nogle farve palettes. 

# Styling af din ListScreen

Her er nogle af de vigtigste principper, vi vil arbejde med i denne opgave:

1. **Flexbox layout**: 
    - Flexbox bruges til at placere elementer i forhold til hinanden, enten i en række eller kolonne. Det er meget nyttigt til at oprette responsive layouts, hvor elementer automatisk justerer sig afhængigt af skærmstørrelsen.
    
    Nøgleegenskaber for Flexbox er:
    - `flexDirection`: Bestemmer retningen på layoutet, enten 'row' (vandret) eller 'column' (lodret).
    - `justifyContent`: Bestemmer hvordan elementer skal placeres langs hovedaksen.
    - `alignItems`: Bestemmer hvordan elementer skal placeres langs krydsaksen (modsat hovedaksen).

2. **Shadow properties**: 
    - Skaber en skygge-effekt bag dine komponenter, hvilket giver et flot løft til designet. Det kan få elementer til at se ud, som om de "hæver sig" fra baggrunden.

    Shadow-egenskaber:
    - `shadowColor`: Farven på skyggen.
    - `shadowOffset`: Angiver, hvor meget skyggen skal forskydes (vandret og lodret).
    - `shadowOpacity`: Hvor gennemsigtig skyggen skal være.
    - `shadowRadius`: Hvor bred og blød skyggen skal være.

## Opdatering af styles i GlobalStyle.js

Du har allerede fået en del grundlæggende styles, men nu skal vi opdatere dem, så de matcher det design, du ønsker.

1. Åbn **GlobalStyle.js** og kig på den nuværende struktur. Du ser nok noget i stil med:
    ```javascript
    //ListScreen
    itemContainer: {},
    infoContainer: {},
    pictureContainer: {},
    contactContainer: {},
    textContainer: {},
    buttonContainer: {
        flexDirection: 'row',
    },
    textContaiter: {},
    itemText: {},
    ```

    Disse styles er endnu ikke stylet som du kan se ved at {} er tom.

    Hvis du kigger i `ListScreen.js` vil du kunne se at de overstående styles er tilknyttet de forskellige elementer af listen, som vi nu skal style.

    ***Super tip!*** I VS-code can du Ctrl + click på de forskellige elementer og se hvor de er tilknyttet. Dette fungerer også hvis du har funktioner og andet du kalder på. Ved Ctrl + click vil du automatisk føres til det sted, hvor det element er defineret. 

2. **Opgave**: Din opgave er nu at opdatere disse styles for at få appen til at se professionel ud!

### Opdatering af `itemContainer`

- **Opgave**: Vi vil gerne have, at hvert element i din liste ser flot og fremhævet ud. For at gøre dette kan du tilføje en hvid baggrund, afrundede hjørner og skygger for at skabe dybde.
- **Tip**: Opdater `itemContainer` ved at tilføje egenskaber som baggrundsfarve, margin, padding, og skygge. Brug også `justifyContent` og `alignItems` til at centrere indholdet.

### Opdatering af `contactContainer`

- **Opgave**: Kontaktinformationen skal vises i en række, så brug `flexDirection` til at placere elementerne vandret.
- **Tip**: Sørg for, at `contactContainer` bruger `flexDirection`, og juster hvordan elementerne skal fylde rummet ved at bruge `flex` egenskaben.

### Opdatering af `infoContainer`, `pictureContainer` og `textContainer`

- **Opgave**: Vi vil gerne adskille informationen og billedet, så det hele ser pænt og struktureret ud.
- **Tip**: Brug `flex` til at bestemme, hvor meget plads hvert element skal tage. Brug også `justifyContent` og `alignItems` til at centrere indholdet vertikalt.

### Opdatering af `itemText`

- **Opgave**: Teksten skal være letlæselig, med en passende skrifttype og farve.
- **Tip**: Brug `fontSize`, `fontWeight`, `fontFamily` og `color` til at give teksten et professionelt udseende.

### Opdatering af `buttonContainer`

- **Opgave**: Knapperne skal være nemme at bruge og skal placeres i en vandret linje, med god afstand imellem dem.
- **Tip**: Brug `justifyContent` for at fordele knapperne jævnt, og sørg for, at `alignItems` er centreret, så knapperne ser pæne og jævne ud. Brug også `flex` og `width` til at placere og styr størrelsen på din knap. 

## Ekstra / Udfordring

- Prøv at tilføje `borderColor` og `borderWidth` til nogle af dine containere for at se, hvordan det påvirker designet.
- Test med forskellige `shadowRadius` og `shadowOpacity` værdier for at få skyggen til at se mere eller mindre intens ud.

<br></br>

# Styling af ProfileScreen 

I denne del af opgaven skal vi arbejde videre med styling af din **ProfileScreen**. Du har allerede fået nogle grundlæggende styles, men nu vil vi forbedre designet for at få et mere professionelt og brugervenligt udseende.

Start med at åbne din `ProfileScreen.js` og se hvordan de forskellige elementer er tilknyttet en style i `GlobalStyles`. 

## Del 1 - Introduktion til `justifyContent` og `alignItems`

Før vi begynder med at opdatere styles, er det vigtigt at forstå nogle af de vigtigste egenskaber, du vil arbejde med i denne del.

1. **justifyContent**:
    - Denne egenskab bruges til at justere, hvordan indhold placeres langs hovedaksen i en Flexbox.
    - Hovedaksen afhænger af `flexDirection`. Hvis `flexDirection` er `'column'`, er hovedaksen lodret (top til bund). Hvis den er `'row'`, er den vandret (venstre til højre).
    - Nogle nyttige værdier for `justifyContent` er:
      - `'flex-start'`: Placerer indholdet i begyndelsen af containeren.
      - `'center'`: Centrerer indholdet.
      - `'flex-end'`: Placerer indholdet i slutningen af containeren.
      - `'space-around'`: Fordeler pladsen jævnt omkring elementerne.
      - `'space-between'`: Fordeler elementerne med lige meget plads mellem dem.

2. **alignItems**:
    - Denne egenskab bestemmer, hvordan indhold placeres langs krydsaksen (den modsatte akse til hovedaksen).
    - Nogle nyttige værdier for `alignItems` er:
      - `'flex-start'`: Indholdet justeres til begyndelsen af krydsaksen.
      - `'center'`: Indholdet centreret langs krydsaksen.
      - `'flex-end'`: Indholdet justeres til slutningen af krydsaksen.

## Del 2 - Forbedring af ProfileScreen-styling

### Opgave 1 - Opdatering af `myProfilePictureContainer`

Vi starter med at style profilbilledets container. I øjeblikket har den en rød baggrund og fylder 2 dele af det samlede layout.

1. Åbn **GlobalStyles.js**, og kig på den nuværende style for `myProfilePictureContainer`. Du ser nok noget som dette:
    ```javascript
    myProfilePictureContainer: { 
        flex: 2, 
        backgroundColor: "red", 
        width: '100%' 
    },
    ```

2. **Opgave**:
    - Vi vil gerne centrere profilbilledet både horisontalt og vertikalt, så vi skal bruge både `justifyContent` og `alignItems`.
    - Fjern baggrundsfarven og giv containeren mere højde ved at ændre `flex` værdien.

3. **Tip**: Husk, at f.eks `flex: 5` betyder, at denne container vil fylde 5 dele af det samlede layout, når den sammenlignes med de andre containere.

### Opgave 2 - Opdatering af `profileInfoContainer`

Næste skridt er at style sektionen, der viser profilinformationen. I øjeblikket har den en grøn baggrund og fylder 7 dele af layoutet.

1. Kig på den nuværende style for `profileInfoContainer`. Du ser nok noget som dette:
    ```javascript
    profileInfoContainer: { 
        flex: 7, 
        backgroundColor: "green", 
        width: '100%' 
    },
    ```

2. **Opgave**:
    - Vi vil gerne fjerne den grønne baggrund og gøre informationerne mere jævnt fordelt ved at bruge `justifyContent`. Vi vil f.eks. gerne sikre, at der er lige meget plads mellem de forskellige elementer...
    - Brug også `alignItems` for at centrere informationen horisontalt.
    - Tilføj noget padding i toppen og bunden (f.eks. 20px), så der er god afstand til containerens kanter.

3. **Tip**: `paddingTop` og `paddingBottom` hjælper med at skabe lidt luft rundt om indholdet, så det ikke ser for kompakt ud.

### Opgave 3 - Opdatering af `saveButtonContainer`

Til sidst skal vi style knap-containeren, som i øjeblikket har en gul baggrund.

1. Kig på den nuværende style for `saveButtonContainer`. Du ser nok noget som dette:
    ```javascript
    saveButtonContainer: { 
        flex: 1, 
        backgroundColor: "yellow", 
        width: '100%' 
    },
    ```

2. **Opgave**:
    - Fjern den gule baggrund og tilføj både `justifyContent` og `alignItems` for at centrere knappen både vertikalt og horisontalt.
    - Justere `flex` for at give knap-containeren lidt mere plads i layoutet.

## Ekstra / Udfordring

- Tilføj flere stylinger for at forbedre designet af din profilside, f.eks. ved at tilføje skygger, afrundede kanter eller ændre farver.
- Prøv at bruge andre værdier for `justifyContent` og `alignItems` for at se, hvordan de påvirker layoutet.

<br></br>

# Styling af ButtonComponent

Du har nok lagt mærke til at der er knapper på de forskellige screens, som stadig ser lidt forkert ud. De skal vi nu til at style ved at style vores komponenter.

I denne del skal vi opdatere dem, så de ser mere moderne og interaktive ud.

Ligesom før, åben dit `ButtonComponent.js` og se hvordan de forskellige styles er tilkoblet komponentet. Bruger du Ctrl + Click på f.eks `ButtonComponent` vil du i VS-code se alle de steder hvor denne knap kaldes på. 

## Del 1 - Forståelse af stylingselementer

### 1. **pressedColor og defaultColor**
   - Disse egenskaber bruges til at ændre farven på knapperne, når de er i deres standardtilstand (defaultColor) og når de er trykket (pressedColor).
   - Vi vil bruge farver som rød for at give knappen en mere kraftfuld fremtoning, og `#FFCCCC` som en lysere farve, når knappen er trykket.

### 2. **borderRadius**
   - `borderRadius` bruges til at gøre knapperne runde eller afrundede. En høj værdi som 50 gør knappen meget afrundet, hvilket giver et blødt og moderne udseende.

### 3. **shadowColor, shadowOffset, shadowOpacity og shadowRadius**
   - Disse egenskaber bruges til at tilføje skygger bag knappen, så det ser ud som om, knappen "hæver sig" fra skærmen. Det giver et flot og professionelt look.
        - **shadowColor**: Bestemmer farven på skyggen.
        - **shadowOffset**: Bestemmer skyggeafstand i x- og y-retning.
        - **shadowOpacity**: Bestemmer, hvor gennemsigtig skyggen er.
        - **shadowRadius**: Bestemmer, hvor bred skyggen skal være.

### 4. **borderWidth og borderColor**
   - Bruges til at give knapperne en kant. Kanten kan være i en anden farve end knappen selv, hvilket tilføjer et flot visuelt element til designet.
        - **borderWidth**: Bestemmer tykkelsen af kanten.
        - **borderColor**: Bestemmer farven på kanten.

## Del 2 - Opdatering af Button Styles

Du har allerede en grundlæggende style i din **GlobalStyles.js** fil, men nu vil vi opdatere den for at give knapperne et professionelt udseende.

### Opgave 1 - Opdatering af `primaryBtn`

1. Kig på den nuværende style for `primaryBtn`. Den ser sådan ud:
    ```javascript
    primaryBtn: {
        pressedColor: '#d1e7ff',
        defaultColor: '#4A90E2',
    },
    ```

2. **Opgave**:
    - Opdater `primaryBtn` til at inkludere en f.eks rød standardfarve og en lysere farve, når knappen er trykket.
    - Brug `borderRadius` for at gøre knappen rund.
    - Tilføj en skyggeeffekt ved at bruge `shadowColor`, `shadowOffset`, `shadowOpacity` og `shadowRadius`.

3. **Tip**: Husk, at bruge `justifyContent` og `alignItems` til at centrere indholdet i knappen, hvilket giver en mere balanceret visning.

### Opgave 2 - Opdatering af `primaryBtnText`

1. Kig på den nuværende style for `primaryBtnText`. Den er tom:
    ```javascript
    primaryBtnText: {},
    ```

2. **Opgave**:
    - Tilføj f.eks en hvid farve til teksten ved hjælp af `color`.
    - Brug `textAlign` for at centrere teksten inde i knappen.
    - Øg skriftstørrelsen med `fontSize` og brug `fontWeight` for at gøre teksten tydelig og fremtrædende.
    - Giv din knap en anden skrifttype ved brug af `fontFamiliy`

### Opgave 3 - Opdatering af `secondaryBtn`

1. Kig på den nuværende style for `secondaryBtn`. Den ser sådan ud:
    ```javascript
    secondaryBtn: {
        pressedColor: '#4A90E2',
        defaultColor: '#d1e7ff',
    },
    ```

2. **Opgave**:
    - Opdater `secondaryBtn` til at bruge f.eks. hvid som standardfarve og en lys rød som pressed farve.
    - Tilføj en rød kant ved at bruge `borderWidth` og `borderColor`.
    - Brug `borderRadius` for at give knappen en afrundet form.
    - Tilføj skyggeeffekter på samme måde som i `primaryBtn`.

### Opgave 4 - Opdatering af `secondaryBtnText`

1. Kig på den nuværende style for `secondaryBtnText`. Den er også tom:
    ```javascript
    secondaryBtnText: {},
    ```

2. **Opgave**:
    - Tilføj en farve til teksten ved hjælp af `color`.
    - Brug `textAlign` for at centrere teksten.
    - Øg skriftstørrelsen ligesom før og brug `fontWeight` for at give teksten et stærkt visuelt udtryk.

## Ekstra / Udfordring

- Overvej at tilføje en overgangseffekt (f.eks. `transition`) for at gøre overgangen mellem farverne mere glidende, når knappen trykkes.

<br></br>

# Styling af TextInput og Picture 

I denne del af opgaven skal vi arbejde med at style tekstinput og billeder i din app. Vi vil opdatere styles for både **TextInputComponent** og **PictureComponent** for at give dem et rent og moderne udseende.

Ligesom før, åben disse komponenter og se hvordan styling er tilknyttet og hvor de forskellige komponetner bruges i appen.

## Del 1 - Forståelse af nye stylingselementer

Før vi begynder at opdatere styles, er det vigtigt at forstå nogle af de nye stylingselementer, vi vil bruge.

### 1. **borderRadius** og **paddingLeft**
   - **borderRadius** bruges til at runde hjørnerne på elementer, som f.eks. tekstfelter og billeder. Det giver et blødere og mere moderne udseende.
   - **paddingLeft** bestemmer, hvor meget plads der er på venstre side af indholdet inde i tekstinput. Det er især nyttigt for at give tekstfeltet en bedre visuel balance og læsbarhed.

### 2. **backgroundColor**
   - **backgroundColor** bruges til at definere baggrundsfarven for elementer. Vi vil bruge en hvid baggrund for at give tekstinput-feltet et rent og letlæseligt udseende.

### 3. **borderColor** og **borderWidth**
   - **borderColor** definerer farven på kanten omkring et element, f.eks. et tekstfelt eller et billede. En lys grå kantfarve giver en minimalistisk og moderne effekt.
   - **borderWidth** bestemmer tykkelsen på kanten.

## Del 2 - Opdatering af TextInputComponent

I din **GlobalStyles.js** har du allerede en grundlæggende style for din **TextInputComponent**, men nu vil vi opdatere den for at forbedre udseendet og brugervenligheden.

### Opgave 1 - Opdatering af `inpLabel`

1. Kig på den nuværende style for `inpLabel`:
    ```javascript
    inpLabel: {},
    ```

2. **Opgave**:
    - Opdater `inpLabel` ved at tilføje en skrifttype og farve. Vi ønsker, at teksten skal være let læselig med f.eks. en neutral farve, som ikke stjæler opmærksomheden.
    - Brug `fontSize` for at gøre teksten lille og diskret.
    - Tilføj `marginBottom` for at skabe lidt afstand mellem etiketten og selve tekstfeltet.

### Opgave 2 - Opdatering af `textInput`

1. Kig på den nuværende style for `textInput`:
    ```javascript
    textInput: {height: 40, width: 200, borderColor: 'gray', borderWidth: 1},
    ```

2. **Opgave**:
    - Forøg højden og bredden for at gøre tekstfeltet større og mere brugervenligt.
    - Ændr kantfarven til en lysere farve for at få det til at se mere moderne ud.
    - Tilføj `borderRadius` for at runde hjørnerne og give det et blødere udseende.
    - Brug `paddingLeft` for at sikre, at teksten indeni tekstfeltet ikke sidder helt op ad kanten.

3. **Tip**: En kontrastende baggrund i tekstfeltet (`backgroundColor:`) gør feltet letter at se og bruge.

## Del 3 - Opdatering af PictureComponent

Nu skal vi style billederne i appen ved at opdatere `picture`-elementet i **PictureComponent**.

1. Kig på den nuværende style for `picture`:
    ```javascript
    picture: {},
    ```

2. **Opgave**:
    - Tilføj en kant omkring billedet ved at bruge `borderColor` og `borderWidth`.
    - Denne kant vil hjælpe med at adskille billedet fra baggrunden og gøre det mere fremtrædende.

3. **Tip**: En tynd, lys kant omkring billeder er en enkel måde at forbedre layoutets visuelle hierarki og give appen et mere struktureret udseende.

## Ekstra / Udfordring

- Eksperimenter med forskellige værdier for `borderRadius` og `borderColor` for at se, hvordan det påvirker udseendet af dine tekstinputfelter og billeder.
- Tilføj skygger til tekstinputfelterne og billederne for at se, hvordan det kan ændre det overordnede udseende og få dem til at "poppe" fra skærmen.


<br></br>

# Styling af Navigation 

I denne opgave skal vi fokusere på at style navigationen i din app. Du har allerede grundlæggende navigation, men vi vil nu opdatere **App.js** ved at tilføje ikoner, skygger og farvetemaer til både tab-bar og header.

## Del 1 - Forståelse af navigation-styling

### 1. **headerStyle og headerTitleStyle**
   - **headerStyle** bruges til at style toppen af appen (header). Vi kan f.eks. ændre baggrundsfarven, tilføje skygger og runde hjørner.
   - **headerTitleStyle** bruges til at style titlen i headeren, som kan ændre skrifttype, farve og størrelse på teksten.

### 2. **tabBarStyle**
   - **tabBarStyle** bestemmer udseendet af navigationsbaren i bunden af skærmen, som tillader brugerne at skifte mellem skærme. Vi vil ændre farven på baggrunden, tilføje skygger og runde hjørner.

### 3. **tabBarActiveTintColor og tabBarInactiveTintColor**
   - **tabBarActiveTintColor** definerer farven på de ikoner og tekster, der vises, når en tab er aktiv (valgt).
   - **tabBarInactiveTintColor** bestemmer farven på ikoner og tekster, når en tab ikke er valgt.

### 4. **Ionicons til ikoner**
   - Vi bruger `Ionicons` til at tilføje ikoner til tab-bar'en. Afhængigt af om tab'en er aktiv, vises en fyldt eller omridset version af ikonet.

## Del 2 - Opdatering af App.js

Nu skal du opdatere vores **App.js** for at forbedre udseendet af navigationen.

### Opgave 2 - Style af headeren

1. **headerStyle** giver dig mulighed for at ændre udseendet af toppen af appen (headeren). Vi vil ændre baggrundsfarven og tilføje skygger.
2. **headerTitleStyle** giver dig mulighed for at ændre udseendet af titlen i headeren. Vi vil ændre skriftstørrelsen og farven på titlen.

3. **Opgave**:
    - Indsæt følgende i din `Tab.Navigator`:
    ```javascript
    <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: {},
          headerTitleStyle: {},
          tabBarStyle: {},
          tabBarIcon:
        },
      })}
    ```
    - I `headerStyle`, tilføj en baggrund, runde hjørner og skygger til headeren.
    - Giv titlen i headeren en anden skrifttype med semibold vægt, en farve der matcher din app, og en støre skrift størrelse.

### Opgave 3 - Style af tabBar

1. Nu skal vi tilpasse udseendet af **tabBar** for at matche resten af appen.
    - Baggrunden skal være en matchende farve, med runde hjørner og skygge.
    - De aktive tabs skal have en hvid farve, og de inaktive tabs skal have en lysere farve.

2. **Opgave**:
    - I `tabBarStyle`, tilføj en farvet baggrund, runde hjørner og skygger.
    - Tilføj `tabBarActiveTintColor` og `tabBarInactiveTintColor` med dine ønskede farver.
    - **Tip** 
        ```
        tabBarActiveTintColor:,
        tabBarInactiveTintColor:, 
        ```

### Opgave 3 - Tilføj ikoner til tabs

1. Du har allerede importeret `Ionicons`, men vi vil bruge det til at tilføje ikoner til hver tab.
    - For `ListScreen` bruger vi ikonet "list" (fyldt) eller "list-outline" (omridset).
    - For `ProfileScreen` bruger vi ikonet "person" (fyldt) eller "person-outline" (omridset).

2. **Opgave**:
    - Gå til din `Tab.Navigator` og brug `tabBarIcon`-props til at vise forskellige ikoner afhængigt af hvilken skærm, der er valgt. Brug `focused` til at tjekke, om tab'en er valgt.

3. **Tip**: Bruge denne kode som vejledning:
    ```javascript
    tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'List') {
            iconName = focused ? 'list' : 'list-outline';
        } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
    }
    ```

`focused`, `color`, og `size` er de tre parametre, som `tabBarIcon`-funktionen modtager. Disse parametre gives automatisk af React Navigation.
- **focused**: Et boolean, der er `true`, når den pågældende tab er aktiv/valgt, og `false`, når den ikke er valgt.
- **color**: Farven på ikonet, som bliver bestemt af om tab'en er aktiv eller inaktiv.
- **size**: Størrelsen på ikonet.

Vi bruger `if-else` for at bestemme, hvilket ikon der skal vises afhængigt af hvilken skærm vi er på.
- `route.name` bestemmer navnet på den aktuelle skærm (tab).
  - Hvis skærmen hedder **"List"**, så får ikonet navnet:
    - `'list'` hvis tab'en er aktiv (`focused === true`).
    - `'list-outline'` hvis tab'en er inaktiv (`focused === false`).
  - Hvis skærmen hedder **"Profile"**, så får ikonet navnet:
    - `'person'` hvis tab'en er aktiv.
    - `'person-outline'` hvis tab'en er inaktiv.

Funktionen returnerer et **Ionicons**-ikon med det valgte `iconName`, `size`, og `color`. **Ionicons** er et ikonbibliotek, som vi bruger til at vise ikoner i appen.
