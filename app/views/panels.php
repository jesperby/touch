<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Malmö stad</title>
<?php include 'head.php'; ?>
</head>
<body id="jqt">

<section id="home" class="current">
  <header class="toolbar">
    <h1>Malmö stad</h1>
  </header>
  <nav>
  <?php if ($isInternal) { ?>
  <h2>Externa tjänster</h2>
  <?php } ?>
    <ul>
      <li class="arrow">
        <a class="slide" href="#news" data-feed="malmo-se-main">Nyheter</a>
      </li>
      <li class="arrow">
        <a class="slide" href="#events">Evenemangskalendern</a>
      </li>
      <li class="arrow">
        <a class="slide" href="#vacancies" data-feed="vacancies">Lediga jobb</a>
      </li>
      <li>
        <a href="https://webapps2.malmo.se/soctanter/" rel="external">Soctanter på nätet</a>
      </li>
      <li>
        <a href="http://www.malmo.se/" rel="external">Malmö stads webbplats</a>
      </li>
    </ul>
    <?php if ($isInternal) { ?>
    <h2>Interna tjänster</h2>
    <ul class="internal">
      <li class="arrow">
        <a class="slide" href="#news" data-feed="komin-main">Nyheter Komin</a>
      </li>
      <li>
        <a href="http://komin.malmo.se/" rel="external">Komin</a>
      </li>
    </ul>
    <?php } ?>
  </nav>
  <footer>
    <nav>
      <a class="home fade" href="#home"></a>
      <div class="end">
          <a class="touch flip settings" href="#settings"></a>
      </div>
    </nav>
  </footer>
</section>

<section id="news" class="edgetoedge">
  <header class="toolbar">
    <h1>Nyheter</h1>
    <nav><a class="back" href="#home">Meny</a></nav>
  </header>
</section>

<section id="news-details" class="edgetoedge">
  <header class="toolbar">
    <h1>Nyheter</h1>
    <nav><a class="back">Nyheter</a></nav>
  </header>
  <article></article>
</section>

<section id="vacancies" class="edgetoedge">
  <header class="toolbar">
    <h1>Lediga jobb</h1>
    <nav><a class="back" href="#home">Meny</a></nav>
  </header>
</section>

<section id="vacancies-details" class="edgetoedge">
  <header class="toolbar">
    <h1>Lediga jobb</h1>
    <nav><a class="back">Alla</a></nav>
  </header>
  <article></article>
</section>

<section id="events">
  <header class="toolbar">
    <h1>Evenemang</h1>
    <nav>
      <a class="back" href="#home">Meny</a>
      <a class="button search slideup" href="#events-search"><span></span></a>
    </nav>
  </header>
</section>

<section id="events-search">
  <form id="events-search-form">
    <header class="toolbar">
      <h1>Sök evenemang</h1>
      <nav>
        <a class="cancel">Avbryt</a>
        <a class="slide button" id="events-search-button" data-search-type="form" href="#events-search-results">Sök</a>
      </nav>
    </header>
  </form>
</section>

<section id="events-nearby">
  <form id="events-nearby-form">
    <header class="toolbar">
      <h1>I närheten</h1>
      <nav>
        <a class="cancel">Avbryt</a>
        <a class="slide button" id="events-nearby-button" data-search-type="nearby" href="#events-search-results">Visa</a>
      </nav>
    </header>

    <label for="events-within">Visa evenemang:</label>
    <ul>
      <li>
        <select name="within" id="events-within">
          <option value="1000">Inom 1km</option>
          <option value="2000" selected="selected">Inom 2km</option>
          <option value="3000">Inom 3km</option>
          <option value="4000">Inom 4km</option>
          <option value="5000">Inom 5km</option>
          <option value="7000">Inom 7km</option>
          <option value="10000">Inom 10km</option>
        </select>
      </li>
    </ul>
    <label>Min position:</label>
    <ul>
      <li id="events-nearby-position">
        Position:
      </li>
    </ul>
    <input type="hidden" name="near" id="events-nearby-near" value="" />
  </form>
</section>

<section id="events-search-results" class="edgetoedge">
  <header class="toolbar">
    <h1>Sökresultat</h1>
    <nav>
      <a class="back" href="#events">Kategorier</a>
      <a class="button search slideup" href="#events-search"><span></span></a>
    </nav>
  </header>
</section>

<section id="events-details">
  <header class="toolbar">
    <h1>Evenemang</h1>
    <nav>
      <a class="back">Åter</a>
      <a class="button search slideup" href="#events-search"><span></span></a>
    </nav>
  </header>
  <article></article>
</section>

<section id="events-arena">
  <header class="toolbar">
    <h1>Arena/Plats</h1>
    <nav>
      <a class="back">Evenemang</a>
      <a class="button search slideup" href="#events-search"><span></span></a>
    </nav>
  </header>
  <article></article>
</section>

<section id="settings">
  <header class="toolbar">
    <h1>Information</h1>
    <nav>
      <a class="back">Åter</a>
    </nav>
  </header>
  <div>
    <p>Det här är några informationstjänster från Malmö stad som är anpassade för iPhone och Android-telefoner.</p>
    <p>Har du frågor kring den här applikationen kan du kontakta  <a href="mailto:cwg@malmo.se">cwg@malmo.se</a>.</p>
  </div>
</section>

</body>
</html>
