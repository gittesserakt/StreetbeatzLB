import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { APP_BASE_HREF } from "@angular/common";
import { ArtistService } from "../../core/services/artist.service";
import { Artist } from "../../core/models/artist.model";

@Component({
  selector: 'app-artist-view',
  templateUrl: './artist-view.component.html',
  styleUrls: ['./artist-view.component.scss']
})
export class ArtistViewComponent implements OnInit {
  artistName!: string;
  artistNameImage!: string;
  artistInfo!: string;

  showedArtist?: Artist;

  allArtistInfos: ArtistInfo[] = [
    {
      artistName: "Alice Rose",
      infoText: "Die Dänische Sängerin, Musikerin und Kosmopolitin lebt in Berlin, der Welthauptstadt der " +
        "elektronischen Musik. Aber statt Drum Machine nimmt sie nun ein neues Instrument mit auf die Straße: eine " +
        "Autoharp. Ein akustisches Instrument, das aus der amerikanischen Bluegrass-Musik stammt. Das Konzept ist " +
        "einfach und wirkungsvoll: Gesang plus Autoharp. Diese Kombination überzeugt mit einer berührenden " +
        "Authentizität. Alice Rose will die Menschen mit ihrer Musik berühren, inspirieren und ermutigen, weiter " +
        "ihren Weg zu gehen."
    },
    {
      artistName: "Bajram Agushev Band",
      infoText: ""
    },
    {
      artistName: "Bastik",
      infoText: "In diesen für uns alle ungewöhnlichen letzten Jahren hat der Stuttgarter Singer-/Songwriter Bastik " +
        "seine Debut-EP „FORT“ produziert und aufgenommen. Sie erschien im September 2021. Eigentlich ist Bastian " +
        "Kilper Schlagzeuger mehrerer Stuttgarter Bands. Als Bastik hat er ein Ventil gefunden, an Gesang und " +
        "Gitarre ganz persönliche Geschichten und Gedanken zu verarbeiten und zu teilen. Hier verwirklicht er alles, " +
        "was er als Schlagzeuger nie verwirklichen konnte."
    },
    {
      artistName: "BENJAKOB",
      infoText: "Aus dem sicheren Hafen der Vergangenheit in den Staub der Straße von heute. Benjakob lernt laufen " +
        "und geht Solo.\n" + "Eigene Songs auf Deutsch und Englisch, Acoustic Soul „straight from the heart“. " +
        "Seine musikalischen Sporen verdiente er in den 2000er Jahren mit Bands wie Jive Injector und Cosmopolitan " +
        "Drive. Beim diesjährigen SMF geht er mit Back-up von Bastian Kilper an den Drums und weiteren Special-Guests " +
        "an den Start."
    },
    {
      artistName: "Beranger",
      infoText: "Stellen Sie sich vor, der klassische Komponist Bach hätte mit Dave Grohl von Nirvana eine Band " +
        "gegründet. Das wäre gar nicht so weit von der Wahrheit entfernt. Beranger Gras ist ein französischer " +
        "Pianist und Todd James ein Grunge-Schlagzeuger aus Australien. Die beiden trafen sich in Berlin und " +
        "spielten in ihren vier gemeinsamen Jahren der Straßenmusik bereits auf den Bühnen des Lollapalooza und " +
        "des Melt Festivals."
    },
    {
      artistName: "blu12",
      infoText: "Blu12 sind blu – Musiker, Künstler, Poet & Ozeanliebhaber- & seine 12-Saiten Gitarrre. Gemeinsam " +
        "zelebrieren sie an den Küsten dieser Welt pures, essentielles Songwriting, Genreübergreifende Rhythmen & " +
        "improsative Meditation. Zwischen den Wellen, kurz vor dem Sonnenuntergang entstehen so atmosphärische " +
        "Klangwelten, welche einen magischen Raum für kleine lyrische Feuerwerke entfalten."
    },
    {
      artistName: "Borja Catanesi",
      infoText: "Borja Catanesi ist ein spanischer Musiker, der schon durch halb Europa getourt ist und auf der " +
        "Straße Gitarre spielt. Mit einer Loop-Station nimmt er live Gitarrenriffs, Basslinien und Beatbox auf und " +
        "schafft so einen kompletten Sound bei seinen Auftritten. Das klingt nach Funk, Reggae, Blues und Rock & " +
        "Roll. Vor kurzem gewann er den ersten Preis der Universal Street Games in Minneapolis, USA, einem " +
        "weltweiten Wettbewerb für Straßenkünstler."
    },
    {
      artistName: "Crobbs",
      infoText: "Spiritual world music with a beat.Atmospheric Handpan performance. Takes you on a journey betwen " +
        "nature sounds using specialist beatboxing through up beat danceable fusion. Afterwards you feel a release " +
        "and peaceful."
    },
    {
      artistName: "HaltMaKurz",
      infoText: "HaltMaKurz – wir laden dich ein, ein paar Noten lang stehenzubleiben!\n" +
        "Wir, das sind Anna und Flo, eine Acoustic-Pop-Combo mit Wurzeln in Würzburg. Anna rockt die Melodica, unsere " +
        "mobile Substitution für Piano und Flügel – und Flo sorgt für ein Fundament auf der Gitarre. Am meisten Spaß " +
        "bringen uns jedoch die zweistimmigen Gesangsparts unserer detailverliebt ausgearbeiteten Straßen-Arrangements.\n" +
        "Fast zwei Jahre lang haben wir die Straßenmusik-Pflaster Europas bereist und bringen Geschichten aus über 20 " +
        "Ländern mit – vom Atlantik bis zum Schwarzen Meer, von Stockholm bis nach Istanbul!\n" +
        "Lass dich begeistern von einem knallbunten Mix aus den wilden 60ern und 70ern, mitreißenden Country-Folksongs, " +
        "irisch angehauchten Stimmungsmachern und zeitlosen Klassikern.\n" +
        "Wir können es kaum erwarten, beim diesjährigen Straßenmusikfestival in Ludwigsburg aufzutreten und freuen uns, " +
        "dich dann vielleicht im Publikum zu entdecken!"
    },
    {
      artistName: "Ideal Forgery",
      infoText: "Ideal Forgery ist eine unbekannte Alternative Rock Band aus Manchester, UK. Mit rauer Stimmgewalt, " +
        "verwobenen Lead-Cello-Linien und einer düsteren Rhythmusgruppe und mit genreprägenden Einflüssen wie Biffy " +
        "Clyro, Ben Howard, Led Zeppelin, Soundgarden und City And Colour entführt ihre Musik die Zuhörer in eine " +
        "einzigartige und vielfältige Klangwelt. Nach der Veröffentlichung ihrer „Debüt-EP“ im Jahr 2017 und mehreren " +
        "ausverkauften Shows in Manchesters führenden Musiklokalen wie dem Deaf Institute, der Manchester Academy, " +
        "der Ruby Lounge und dem Night and Day Cafe, veröffentlichte die Band 2018 ihre Single „Chase The Light“, " +
        "mit der sie 2019 auf eine Tour durch Großbritannien ging, die auf der Isle of Man endete. Die Band arbeitet " +
        "derzeit im Studio an ihrem ersten Album und wird demnächst eine Doppel-A-Seiten-Single veröffentlichen, " +
        "gefolgt von weiteren Live-Terminen und einer anschließenden UK-Tour."
    },
    {
      artistName: "Jivers",
      infoText: "Jivers ist eine vierköpfige Band mit einem spezifischen Jazz-Repertoire: Vocal Swing der dreißiger " +
        "und vierziger Jahre. Vorwiegend inspiriert von Bands wie „The Mills Brothers“, „The Andrews Sisters“ und " +
        "„The Boswell Sisters“, passen sie Originalarrangements an ihre Instrumentierung an. Ein anderes Mal " +
        "kreieren sie ihre eigenen Arrangements für nicht so traditionelle Songs, wobei sie die Betonung auf eine " +
        "enge dreistimmige Harmonie legen und Instrumente mit ihren Stimmen imitieren. Die Rhythmusgruppe besteht " +
        "aus einer Gitarre und einer kleinen Trommel, ergänzt durch eine typische traditionelle Jazzformation der " +
        "20er Jahre: eine Tuba, ein Banjo und ein Waschbrett. Die übrigen traditionellen Jazz-Instrumente – wie " +
        "Trompete, Klarinette oder Posaune – werden von den Sänger*innen mit der eigenen Stimme imitiert, was ein " +
        "typisches Mittel dieser Art von Gesangsformationen ist. Neben der wachsenden Swing-Tanzszene in " +
        "Argentinien – mit Ausprägungen wie dem Lindy Hop und dem Charleston – verstehen Jivers diesen Stil " +
        "als „soziale Tanzmusik“, im Gegensatz zum moderneren und intellektuellen Jazz, der in der Be Bop-Ära aufkam.\n" +
        "\n" + "2021 erreichten die „Jivers“ beim SMF@Home den 1. Platz."
    },
    {
      artistName: "Jon Kenzie",
      infoText: "Solosänger und Gitarrist, die originelle Soul-, Blues- und Folktitel mit einer Mischung aus " +
        "beschwingten und entspannten Stimmungen vorträgt, je nachdem, was für die jeweilige Umgebung erforderlich ist."
    },
    {
      artistName: "Karacan Kombo",
      infoText: "Istanbul: Ein Ort, wo verschiedene Welten eins werden. Wo Moderne und Tradition Tür an Tür wohnen " +
        "und wo sich Menschen verschiedenster Kulturen treffen und an ihren Gemeinsamkeiten arbeiten. Karacan Kombo " +
        "widerspiegelt diese multikulturelle Symbiose und entführt in nahe und ferne Klangwelten. Neben eigenen " +
        "Kompositionen werden Lieder aus der Türkei und Umgebung in vielfältigen Rhythmen und Stimmungen frisch " +
        "interpretiert. Bereichert wird das Ganze durch Anekdoten und Erklärungen von    Gürkan Karacan.\n" +
        "Die Band besteht aus internationalen Musikern und gibt Konzerte an kulturellen Anlässen, Musikfestivals " +
        "sowie privaten Veranstaltungen, über die Landesgrenzen hinaus."
    },
    {
      artistName: "Kuma",
      infoText: "Kuma is a band that stands out for its diversity and musical eclecticism, fusing genres such as " +
        "funk, cumbia, forró, samba, reggae, dub, alternative rock, indie rock, and gypsy. The combination of " +
        "these styles creates a unique and exciting sonic identity that is distinguished by its energy and passion " +
        "on stage. The band’s ability to integrate different elements and genres in their music makes for a unique " +
        "and unforgettable sensorial experience for their listeners. Their music is an explosion of energy and " +
        "passion that takes you on an intense and exciting musical journey. With a strong stage presence and an " +
        "unbreakable connection with their audience, Kuma stands out as an emerging band that is changing the game. " +
        "Get ready to dance, jump, and sing along with Kuma, a band you can’t afford to miss."
    },
    {
      artistName: "Kustan Adam",
      infoText: "Anfang der 2010er Jahre gründete er als Gitarrist und Singer-Songwriter eine Band namens " +
        "Little Blueman. Später startete er eine Solokarriere, machte sich einen Namen und begann als " +
        "Straßenmusiker auf den Bühnen einiger lokaler Kneipen aufzutreten.\n" +
        "Im Jahr 2021 veröffentlichte er sein Debütalbum „I Ain’t Got A Car“ und begann sofort eine Tournee " +
        "durch verschiedene Clubs und Festivals mit Songs aus seinem neuen Album. Im Jahr 2022 veröffentlichte " +
        "er 2 Singles und spielte ständig auf Bühnen, in Bars und auf der Straße. Derzeit plant er, 2023 ein " +
        "neues Album aufzunehmen und auf Eu-Tour zu gehen. Sein Sound ist lebendig und farbenfroh mit starken " +
        "Wurzeln im Blues und der Rockmusik der 60er Jahre, die er mit modernen und alternativen Elementen mischt, " +
        "um seine einzigartige Perspektive zu schaffen. Er trägt seine Songs ohne Band vor und schafft so die " +
        "pulsierende Atmosphäre der verrauchten Bars und Straßen."
    },
    {
      artistName: "Lavinia Hope",
      infoText: "Die 20-jährige Singer-Songwriterin Lavinia Hope aus Stuttgart ist eine brandneue aufstrebende " +
        "Popkünstlerin mit einer unverwechselbaren Stimme und einem dunklen, futuristischen Vibe mit einem Hauch " +
        "von Niedlichkeit. Lavinia ist halb Italienerin, halb Britin und hat die meiste Zeit ihres Lebens in " +
        "verschiedenen Ländern gelebt. Sie hat eine ganz eigene Geschichte, die sie mit ihren melancholischen " +
        "Melodien und Texten erzählen kann. Ihr Musikstil lässt sich leicht als eine Mischung aus Künstlern wie " +
        "Billie Eilish, The Kid Laroi und Nina Chuba beschreiben. Ihre sehr junge, überwiegend weibliche " +
        "Fangemeinde ist im Laufe des Jahres 2022 auf 40.000 Follower auf Tik Tok und 2,4.000 auf Instagram " +
        "angewachsen. Lavinia hat es bisher geschafft, vier Songs als unabhängige Künstlerin zu veröffentlichen: " +
        "„A Friend“ debütierte im Januar 2022 und hat 220.000 Streams erreicht. „Had It All“ hat in nur 3 Monaten " +
        "die 50.000 Streams überschritten."
    },
    {
      artistName: "Lev Radagan",
      infoText: "Psychedelic Skateboard Slide Guitar LEV RADAGAN ist ein Multi-Instrumentalist, Komponist und " +
        "Produzent, der Frontmann der Psychedelic-Rock-Band Redlake Circus, deren theatralische Auftritte die " +
        "Bühnen auf der ganzen Welt begeistern und schnell zu einem Muss für Live-Auftritte geworden sind. " +
        "LEV RADAGAN ist bekannt für seinen einzigartigen psychedelischen Sound, der aus einer Mischung von " +
        "groovigen Hard Rock Riffs, sanften Blues Licks und mystischen orientalischen Atmosphären besteht und " +
        "hypnotische Melodien schafft, die Sie auf eine Reise durch die Gedanken mitnehmen werden. „Santanas " +
        "Gitarrensound wird Sie auf eine Reise durch Raum und Zeit mitnehmen, eine Mischung aus Jimi Hendrix " +
        "und Pink Floyd“- Urban Cultures, NY, USA\n" +
        "„Umwerfende Performance“- Newcomer Szene, Berlin, Deutschland."
    },
    {
      artistName: "Magdalena Ganter",
      infoText: "Mal freigeistige Comedienne, mal exaltierte Diva, manchmal auch beides zusammen. Ob entrückte " +
        "Denkerin und Songwriterin, sehnsüchtig Liebende oder kindliche Lebensfreudeversprüherin – Chanson " +
        "noir-Schöpferin Magdalena Ganter schlüpft auf ihrem ersten unter eigenem Namen veröffentlichten Album " +
        "in viele Rollen, bleibt dabei aber immer: ganz sie selbst. All die Facetten zwischen Stille und " +
        "Spektakel gehören schließlich zu ihrer vielschichtigen Persönlichkeit, die sie – gemeinsam mit ihrem " +
        "musikalischen Partner Simon Steger, der ihr schon im Electro-Chanson-Trio Mockemalör zur Seite stand – " +
        "auf Neo Noir so ungefiltert wie noch nie auf ihr Publikum loslässt. War sie bei Mockemalör noch Kunstfigur, " +
        "zeigt das Solo-Debüt kein Alter Ego mehr, sondern eine gereifte, bei sich selbst angekommene Künstlerin."
    },
    {
      artistName: "Mario Parizek",
      infoText: "Mario Parizek verschmilzt auf unverwechselbare Weise mit seiner Gitarre. Er entlockt mit " +
        "Fingerpicking nicht nur den Saiten außergewöhnliche Klänge – begleitend verwendet er den Korpus seiner " +
        "Gitarre als Percussionsinstrument. Auf verblüffende Art schafft er es, eine ganze Band mit einem " +
        "Instrument zu imitieren. Das Publikum erwartet eine Reise in verschiedenste Klangwelten und bietet " +
        "erfrischend neue Perspektiven auf die Möglichkeiten einer Gitarre. Durch das Programm führt der tiroler " +
        "Musiker mit Erzählungen aus seinen Reisen als Straßenmusiker quer durch Europa.  Parizek´s Werk " +
        "„Fingerpick meets Blasmusik“ , das bisher einzigartige Werk für percussive Fingerstyle und Blasmusik " +
        "wurde bereits in Europa, USA und Russland von unterschiedlichen Orchestern aufgeführt.  Sei es die " +
        "Straße, die Konzertbühne mit Orchester oder auf Street Art Festivals quer durch Europa.  Mario Parizek " +
        "hinterlässt einen bleibenden Eindruck bei den ZuhörerInnen."
    },
    {
      artistName: "MC Money and the Jazz Rats",
      infoText: ""
    },
    {
      artistName: "Mirakolo",
      infoText: "Weder gerührt noch geschüttelt: Mirakolo überzeugt mit einer hochexplosiven Mischung aus " +
        "Virtuosität und Präzision. Weg von den Konventionen hin zum Undefinierten. Die Bieler Band kombiniert " +
        "schnellste Fingerakrobatik mit bekannten Rhythmen und fordert das Publikum mit einer Mischung aus Jazz " +
        "und Balkangrooves bedingungslos zum Tanzen auf. Die 4 Jungs beweisen, dass eine Band mit Minimalbesetzung " +
        "die Clubs zum Kochen bringen kann und verleihen der Musik mit ihren artistischen Einlagen am Instrument " +
        "ihren einzigartigen Zauber; schlichtweg „mirakolös!“"
    },
    {
      artistName: "Moanzy",
      infoText: "Moanzy from the Netherlands is a looper/songwriter who like plays a mixture of original & covers " +
        "on the streets. He has been traveling to Brazil, Japan and Europe to play his music."
    },
    {
      artistName: "Mr Alboh",
      infoText: "Mr Alboh ist ein moderner Singer-Songwriter, der alles hinter sich gelassen hat, um ein Ziel zu " +
        "verfolgen: „A Little Bit Of Heaven“ zu teilen. Über 1000 Shows in den USA und Europa. Seine Auftritte sind " +
        "eine Mischung aus Folk- und Popsongs, angereichert mit Geschichten und dem Einsatz einer Loop-Station. Er " +
        "hatte mehrere Fernsehauftritte (RAI1, X Factor) und viele Songs wurden in Fernsehsendungen und Filmen " +
        "verwendet (Top 3 weltweit auf Netflix, NDR, DMAX, Biennale von Venedig und mehr)."
    },
    {
      artistName: "MT Head",
      infoText: "MT Head ist eine Band aus dem Raum Pforzheim, die 2014 gegründet wurde. Gespielt wird handgemachter " +
        "Pop-Rock mit Ecken und Kanten in einer etwas speziellen Besetzung. Simon sitzt an der Cajon, Valentin " +
        "spielt je nachdem, was gerade gebraucht wird, Cello, Bass oder Geige und David spielt Gitarre und singt. " +
        "Zu Hören bekommt ihr eine Mischung aus eigenen Songs und Covern mit akustischem Sound. Gesungen wird auf " +
        "Englisch und über alles, was so in ihren Köpfen ist."
    },
    {
      artistName: "PaperMoon SwingCombo (Tiffany Estrada)",
      infoText: "Die Stuttgarter PaperMoon SwingCombo ist eine lebenslustige Handvoll Musiker, bei denen die " +
        "Philosophie des Straßenspiels im Mittelpunkt steht. Mit Early Jazz, Blues und Swing bringt Gene Clarke " +
        "einen Savoir-fair nach Stuttgart, geschliffen durch 30 Jahre Leben in Paris, wo das Spielen an " +
        "Wochenenden auf den Straßen des Marais zur Jobbeschreibung eines Jazzers gehört. Streetwise-Spontaneität " +
        "und eine authentische, freudige Verbindung mit dem Publikum ist die Mission von PaperMoon! Mit Gene an der " +
        "Trompete, Tiffany Estrada, die am Mikrofon herumtanzt, dem Meisterakkordeonisten Frank Eisele und dem " +
        "Folk-Rocker Michael Hecht an der Gitarre wird das Publikum keine andere Wahl haben, als mitzutanzen."
    },
    {
      artistName: "Ramm Tamm Tilda",
      infoText: "„Nix Band – Wir sind ’ne Bande!“\n" +
        "Das sind Motto und Selbstverständnis von Ramm Tamm Tilda aus Erfurt. Violine, Kontrabass, Gitarre und " +
        "Mini-Drums spielen eine unbändig-tanzbare Mischung aus Jazz, Reggae und Weltmusik. Mit Spielfreude, die " +
        "Funken sprüht und überaus guter Laune, zieht das Kollektiv alle in den Bann.\n" +
        "Kein unnötiger Schnickschnack, viel Authentizität und musikalische Schnellkraft – gerne auch ohne Strom."
    },
    {
      artistName: "Roadstring Army",
      infoText: "Gitarren und Stimmen so rau wie das Kopfsteinpflaster von dem sie kommen. Roadstring Army ist die " +
        "warme Tasse schwarzer Kaffee für den von Selbstzweifeln getriebenen Träumer. Mit dem Herzen denkend. Auf " +
        "der Suche nach sich selbst. Der Bolzenschneider zum Anderssein. In den vergangenen 3 Jahren hat die Ulmer " +
        "Band auf über 200 Konzerten bewiesen, dass Bühnenleidenschaft gepaart mit Originalität ein breites " +
        "Publikum berühren. 2021 heißt: Roadstring Army is starting over! Elektrische Gitarren gepaart mit " +
        "eingängigen Hooklines. Eine einmalige Kombination aus handgemachtem, rohem Rock und anschmiegsamen " +
        "HipHop-Elementen am Puls der neuen Zeit. Was bleibt ist ehrlicher, markant bissiger Sound mit der " +
        "richtigen Prise Straßenstaub."
    },
    {
      artistName: "Simon Fetzer",
      infoText: "Simon Fetzer – der gefühlvolle Pianoman aus der „The Voice of Germany” -Staffel 11 berührt mit " +
        "eigenständig interpretierten Coverversionen vom Deutschpop bis zu internationalen Klassikern. Sein " +
        "ausdruckstarker und einzigartiger Gesang verschmilzt dabei auf wundervolle Art mit gefühlvollem " +
        "Pianospiel zu musikalischen Gänsehaut-Momenten.\n" +
        "\n" +
        "Der 53jährige Musiker Simon Fetzer ist 2-sprachiger Singer und Songwriter, am liebsten „in der Welt " +
        "Zuhause“, auf ganz großen Bühnen unterwegs, im coolen Musik-Club ebenso wie beim intimen Listening " +
        "Konzert vor 20 Gästen mit Wohnzimmeratmosphäre oder als „Showact“ mit 1-3 Songs.\n" +
        "\n" +
        "Simon Fetzer ist aufgewachsen in einer Musikerfamilie und hat in seiner bisherigen Laufbahn schon mit " +
        "zahlreichen bekannten Künstlern und Bands gearbeitet. Nach einer erfolgreichen Karriere als Unternehmer " +
        "hat Simon Fetzer durch seinen erfolgreichen Auftritt bei „The Voice of Germany“ auf SAT 1 / ProSieben " +
        "(mit über 1 Mio Clicks auf YouTube im Jahr 2021) der Musik wieder einen festen Platz in seinem Leben gegeben.\n" +
        "\n" +
        "Simon begleitet sich selbst am E-Piano, das Programm kann aber auch mit Gitarre und weiblichem Gesang als " +
        "Duo oder Trio erweitert werden. Aktuell arbeitet Simon vor allem an eigenen deutschsprachigen Songs und " +
        "dem Aufbau einer eigenen Band."
    },
    {
      artistName: "SISSOS",
      infoText: "Sissos sind ein Akustik-Duo aus Sydney bestehend aus den Schwestern Georgie Fisher und Steph Grace. " +
        "Die beiden fluten den Raum mit Charme und ihrem großen Talent. Bluesige Feel-Good-Songs, die einem " +
        "instinktiv ein Lächeln auf die Lippen zaubern. Lasst euch auf eine Reise in die Kindheit der zwei " +
        "Künstlerinnen mitnehmen und werdet Teil ihrer musikalischen Familie."
    },
    {
      artistName: "Sleepwalker’s Station",
      infoText: "Akustischer Welt Folk in 5 Sprachen und 4 Dialekten durchtränkt von Nuancen aus Flamenco, " +
        "Chanson, ItaloHipHop und alpenländischer Liedermachertradition. Sleepwalker’s Station sind seit 2011 " +
        "unterwegs in Europa, Australien und Amerika bei über 1.000 LiveAuftritten u.a. auf Festivals wie dem " +
        "Glastonbury (UK), Live at Heart (S), No sin Música (E), Westway Lab (PT) usw."
    },
    {
      artistName: "Tijs Groen",
      infoText: "Living in my van playing music everywhere I can."
    },
    {
      artistName: "Toni Mogens",
      infoText: "Toni Mogens Motto lautet: Einen Schritt weitergehen, neue Wege finden, neue Seiten zeigen und doch " +
        "man selbst bleiben.\n" + "Der Karlsruher Singer-Songwriter hat bereits in den letzten Jahren durch seine " +
        "einmaligen und ehrlichen Auftritte sowie mehrer Award-Gewinne für Aufsehen gesorgt. Lasst euch von seinen " +
        "Melodien verzaubern."
    },
    {
      artistName: "Walk Two Folk",
      infoText: "Matthias „Sharpharp“ Weidle, Bluesmusiker aus Fellbach und Matthias Möhring, Singer/Songwriter " +
        "aus Stuttgart. „Walk Two Folk“ spielen handgemachte, akustische Musik aus den USA, Irland, Großbritannien " +
        "und Deutschland, virtuos mit Mundharmonika, Ukulele, Percussion, Gitarre und Gesang- und viel Tempo und Witz."
    }
  ];

  constructor(private route: ActivatedRoute, @Inject(APP_BASE_HREF) public baseHref: string, private artistService: ArtistService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const name = params.get('artistName');
      if (name != null) {
        this.artistName = name;
        this.artistNameImage = this.formatArtistToImageName(name);

        this.getArtistByName(name).then((artist) => {
          this.showedArtist = artist as Artist;
          this.artistInfo = this.showedArtist.artist_info;
        }).catch((error) => {
          console.log(error);
        });
      }
    })
  }

  getArtistByName(name: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.artistService.getArtistByName(name).subscribe((response) => {
        const {data, error} = response;
        if (data) {
          resolve(data);
        }
        if (error) {
          reject(error);
        }
      });
    });
  }

  formatArtistToImageName(name: string): string {
    name = name.trim();
    name = name.replace(/\s+/g, '_');
    name = name.toLowerCase();

    return name;
  }
}

interface ArtistInfo {
  artistName: string;
  infoText: string;
}
