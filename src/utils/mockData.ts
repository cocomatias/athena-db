import {
  AssignedDataChunk,
  GroupedDataObject,
  SupabaseData,
  SupabaseDataChunk,
} from '@types';

export const mockDBDataWithoutTokens = [
  {
    id: 1,
    name: 'Laptop',
    category: 'Electronics',
    price: 999.99,
    description: 'Powerful laptop with high-performance specifications.',
  },
  {
    id: 2,
    name: 'Smartphone',
    category: 'Electronics',
    price: 699.99,
    description: 'The latest smartphone with advanced features.',
  },
  {
    id: 3,
    name: 'Headphones',
    category: 'Electronics',
    price: 99.99,
    description: 'Noise-canceling headphones for immersive audio experience.',
  },
  {
    id: 4,
    name: 'Coffee Maker',
    category: 'Kitchen Appliances',
    price: 49.99,
    description: 'Automatic coffee maker for your morning brew.',
  },
  {
    id: 5,
    name: 'Digital Camera',
    category: 'Electronics',
    price: 499.99,
    description: 'High-quality digital camera for photography enthusiasts.',
  },
  {
    id: 6,
    name: 'Running Shoes',
    category: 'Footwear',
    price: 79.99,
    description: 'Comfortable and stylish running shoes for active lifestyles.',
  },
  {
    id: 7,
    name: 'Backpack',
    category: 'Fashion',
    price: 39.99,
    description: 'Stylish and functional backpack for everyday use.',
  },
  {
    id: 8,
    name: 'Gaming Console',
    category: 'Electronics',
    price: 299.99,
    description: 'Next-gen gaming console for immersive gaming experiences.',
  },
  {
    id: 9,
    name: 'Blender',
    category: 'Kitchen Appliances',
    price: 29.99,
    description: 'Powerful blender for making smoothies and more.',
  },
  {
    id: 10,
    name: 'Ebook Reader',
    category: 'Electronics',
    price: 129.99,
    description: 'Lightweight ebook reader for avid readers.',
  },
];

export const mockDBBigDataWithoutTokens = [
  `Para la enciclopedia, véase Historia Argentina (enciclopedia).

  Historia de la Argentina
  Historia de la Argentina
  desde los primeros habitantes a la actualidad
  Historia precolombina de Argentina
  Poblamiento inicial y paleolítico
  Culturas agroalfareras
  Poblaciones indígenas desde la conquista
  Argentina parte del Imperio español
  Descubrimiento y conquista de la Argentina
  Entre la Conquista y el Virreinato
  Virreinato del Río de la Plata
  Formación del Estado argentino
  Independencia
  Autonomías provinciales
  Organización Nacional
  Argentina moderna
  República conservadora
  Primeras presidencias radicales
  La «Década Infame»
  Argentina contemporánea
  Peronismo y antiperonismo
  Durante el apogeo de la Guerra Fría
  Recuperación de la democracia y globalización
  Kirchnerismo y macrismo
  
  Ubicación de la Argentina (incluyendo a las Islas Malvinas, la Antártida Argentina y otros territorios reclamados) en América del Sur, y situación comparativa en un planisferio.
  La historia de la Argentina es la cronología de sucesos desde el comienzo del primigenio poblamiento humano en el actual territorio de la República Argentina hasta nuestra propia actualidad.
  
  Se inicia con los vestigios más antiguos de seres humanos en suelo argentino, detectados en el extremo sur de la Patagonia, que datan de hace unos 13 000 años. Las primeras civilizaciones agroalfareras se establecieron en el noroeste andino desde el siglo xviii a. C.
  
  La historia escrita de lo que es la Argentina comenzó con los registros del cronista alemán Ulrico Schmidl en la expedición de Juan Díaz de Solís en 1516 al Río de la Plata, hecho que anticipa la dominación española que se impondría en parte de esta región.
  
  En 1776 la corona española creó el Virreinato del Río de la Plata, entidad aglutinadora de territorios a partir de la cual, con la Revolución de Mayo de 1810, comenzaría un proceso gradual de formación de varios Estados autónomos —llamados provincias— o independientes, entre ellos el que llevó el nombre de Provincias Unidas del Río de la Plata.
  
  Con la declaración de la independencia el 9 de julio de 1816 y la derrota militar del Imperio español en 1824 se formalizó la existencia soberana. En 1833 el Imperio británico tomó posesión de las Islas Malvinas que entonces era una comandancia militar de las Provincias Unidas, cuya devolución ha reclamado la Argentina desde entonces.
  
  Tras un prolongado período de guerras civiles, entre 1853 y 1860 se aprobó una república federal con el nombre de República Argentina. Mediante guerras contra los pueblos mapuche, tehuelche, ranquel, wichi y qom, conocidas como Conquista del Desierto y Conquista del Chaco, la República Argentina tomó posesión de las llanuras chaqueña y pampeana y de la Patagonia oriental, conformando su territorio actual, el octavo más extenso del mundo.
  
  Entre 1862 y 1930 transcurrió un largo período de estabilidad constitucional, en el que debido a una gran ola migratoria proveniente sobre todo de Italia y España, la población argentina creció cinco veces más rápido que la del mundo.
  
  La implantación del sufragio universal para varones en 1912, completado con el reconocimiento del derecho al sufragio a las mujeres en 1951, dio origen a una serie de gobiernos electos por el voto popular, que se alternaron en el poder partir de 1930 con dictaduras militares, gobiernos fraudulentos y gobiernos de legitimidad limitada debido a las proscripciones políticas.
  
  Luego de la derrota en 1982 en la guerra de las Malvinas contra el Reino Unido, la última dictadura colapsó, siendo sus integrantes enjuiciados por graves crímenes de lesa humanidad. En 1983 se inició un extenso período de democracia que continúa en la actualidad, sucediéndose desde entonces nueve presidentes pertenecientes a tres partidos: Raúl Alfonsín, Carlos Menem, Fernando de la Rúa, Adolfo Rodríguez Saá, Eduardo Duhalde, Néstor Kirchner, Cristina Fernández de Kirchner, Mauricio Macri y Alberto Fernández.
  
  Poblamiento inicial
  
  Mapa de las migraciones humanas fuera de África, versión de Naruya Saitou y Masatoshi Nei (2002) del Instituto Nacional de la Genética del Japón1 que coincide con la versión de Göran Burenhult (2000).2
  Los primeros seres humanos que arribaron al actual territorio argentino parecen haber llegado por el extremo sur de la Patagonia provenientes de lo que hoy es Chile. Los restos más antiguos de la presencia humana se encuentran en Piedra Museo (Santa Cruz) y se remontan al 11 000 a. C. Junto con los yacimientos de Monte Verde (Chile) y Pedra Furada (Brasil) constituyen, hasta el momento, los sitios de poblamiento más antiguos hallados en Sudamérica. Estos yacimientos sustentan la teoría del poblamiento temprano de América (pre-Clovis).
  
  Estos primeros habitantes del territorio argentino se dedicaban a la caza de milodones,3 (mamífero parecido a un gran oso con cabeza de camello, ya extinguido)[cita requerida] y de Hippidion saldiasi3 (caballos sudamericanos que desaparecieron hace 8000 años),[cita requerida] además de llamas gráciles, guanacos, y ñandúes.3
  
  Cerca de allí, también es posible ver las pinturas de manos y guanacos estampadas 7300 a. C. en la Cueva de las Manos (río Pinturas, provincia de Santa Cruz). Se trata de una de las expresiones artísticas más antiguas de los pueblos sudamericanos y ha sido declarada Patrimonio Cultural de la Humanidad por la Unesco.
  
  Para el año 9000 a. C. ya había comenzado el poblamiento de la pampa, en tanto que la zona del Noroeste del país comenzó a ser habitada hacia el 7000 a. C..
  
  Historia precolombina
  Esta sección es un extracto de Historia prehispánica de Argentina.[editar]
  
  Cueva de las Manos, a orillas del río Pinturas, en la provincia de Santa Cruz, 7300 a. C. El arte más antiguo de Sudamérica.
  La historia prehispánica de la Argentina hace referencia a los desarrollos culturales locales del actual territorio de la República Argentina previos a la conquista y colonización por parte de España.
  
  El primer registro poblacional del territorio actualmente controlado por la Argentina se remonta al 12.° o al 13.er milenio AP, de acuerdo a los hallazgos de Los Toldos y Piedra Museo.4 Entre los pueblos originarios, los cazadores y recolectores habitaron la Patagonia, la Pampa y el Chaco. Los agricultores se instalaron en el noroeste, Cuyo, las Sierras de Córdoba y después en la mesopotamia. Tastil, en el noroeste, fue la ciudad precolombina más grande ubicada en el actual territorio argentino, con una población de 2000 habitantes.5
  
  Los pueblos indígenas argentinos se dividieron en dos grandes grupos: los cazadores y recolectores, que habitaban la Patagonia, la Pampa y el Chaco; y los agricultores, instalados en el norte, Cuyo, las Sierras de Córdoba y, más tardíamente, en la Mesopotamia.
  
  Los primeros rastros de vida humana en este territorio corresponden a pueblos de un nivel cultural paleolítico que tres mil años atrás incorporaron los primeros aportes culturales mesolíticos y neolíticos.6 Hasta la época de la conquista y de la colonización europea, el territorio argentino ha estado ocupado por diversos pueblos originarios, con diferentes organizaciones sociales que se pueden dividir en tres grupos principales:78
  
  Cazadores y recolectores de alimentos básicos canoeros oceánicos, como los yaganes o yámana y los haush en Tierra del Fuego y los canales fueguinos. Cazadores y recolectores, que habitaban la Patagonia, la Pampa y el Chaco.
  Cazadores avanzados y recolectores de alimentos como los pámpidos, en el centro-este: hets en las praderas y estepas de la región pampeana y norpatagónica; y chonks en la Patagonia —invadidos desde el s. XVIII por los mapuches alfareros procedentes de la zona cordillerana de la Patagonia— y los qom y wichi en la región chaqueña.9 También pertenecen a este grupo los pámpidos charrúas y minuanes, que habían incorporado la cerámica.
  Los agricultores con cerámica como los guaraníes y las culturas andinas y derivadas. A partir del segundo milenio, los avá (un pueblo amazónido conocido desde el siglo xvii por los españoles como «guaraníes») invadieron el NEA y la Región del Litoral; eran cultivadores de mandioca y avaty o maíz en forma de roza (tala y quema de florestas) y por ello semisedentarios.7 Las culturas centradas en la agricultura y ganadería del norte eran puramente sedentarias, y habían desarrollado redes comerciales englobadas en el conjunto actualmente llamado «quechua»; tras establecer un sistema cuasi estatal en torno a señoríos locales, fueron sometidos por el imperio incaico hacia el año 1480. Influidos por estas culturas andinas, otros pueblos como los diaguitas, calchaquies y huarpes desarrollaron una agricultura y ganadería de menor desarrollo, adaptada a las condiciones de las regiones llanas y serranas del centro de la actual Argentina y de Cuyo.7
  En los siglos XIV y XV, el Imperio incaico conquistó parte de las actuales provincias de Jujuy, Salta, Catamarca, el extremo oeste de la provincia de Tucumán, la parte oeste de las provincias de La Rioja y San Juan, el noroeste de la provincia de Mendoza y, probablemente, el norte de la de Santiago del Estero,10 incorporando sus territorios al Collasuyo, que era la parte sur del Tahuantinsuyo o regiones de tal imperio.
  
  Tradicionalmente, se atribuye la conquista al monarca inca Túpac Yupanqui. Varios señoríos de la región, como los quechuas, los likanantai (atacamas), los huarpes, los diaguitas y otros, intentaron resistir, pero los incas lograron dominarlos, trasladando a sus territorios a los mitimaes o colonos deportados de las tribus de los chichas, que habitaban en lo que es el suroeste del actual territorio boliviano. Otros, como los sanavirones, los lule-tonocoté y los henia-kâmîare (popularmente llamados «comechingones»), resistieron con éxito la invasión incaica y se mantuvieron como señoríos independientes.7
  
  Crearon centros agrícolas y textiles, asentamientos (collcas y tambos), caminos (el "camino del inca"), fortalezas (pucarás) y santuarios de alta montaña. Algunos de los principales son el pucará de Tilcara, la tambería del Inca, el pucará de Aconquija, el santuario de Llullaillaco, el shincal de Londres y las ruinas de Quilmes.
  Argentina parte del Imperio Español (1516-1806)
  Artículo principal: Conquista y colonización española de la Argentina
  
  El Planisferio de Cantino (1502), muestra la Línea de Tordesillas con la que se dividió el mundo en 1494. Sería aproximadamente el meridiano 60 en medidas actuales. En su extremo inferior izquierdo puede verse en blanco la zona (aún ignota por entonces) en la que se encuentra el actual territorio argentino.
  
  Universidades virreinales del Imperio español en América y Filipinas
  La conquista española de parte del actual territorio argentino se realizó mediante tres esfuerzos independientes: expediciones desde España hacia el Río de la Plata y el Paraguay, expediciones organizadas en el Perú para ocupar las tierras del Tucumán, y expediciones de Chile hacia Cuyo. De allí surgen las tres grandes subdivisiones: Nueva Andalucía (después dividida en Río de la Plata y Guayrá-Paraguay), Córdoba del Tucumán, y el Corregimiento de Cuyo. Las primeras dos pertenecieron al Virreinato del Perú, la última a la Capitanía General de Chile. En 1779 las tres pasaron a formar parte del nuevo Virreinato del Río de la Plata.
  
  Teniendo en cuenta que en el Imperio español la unidad social se concebía a través de la unidad de la Fe de la Iglesia católica, gracias a la bula Sublimis Deus del papa Pablo III de 1537 se declaró a los indígenas hombres con todos los efectos y capacidades de cristianos.1112 Hoy en día, gracias al mestizaje, la población de los países hispanoamericanos comparte antepasados indígenas y europeos, en diversos grados.[cita requerida]
  
  En este período se produjo la muerte de la mayor parte de la población indígena en la catástrofe demográfica en América tras la llegada de los europeos, que llevó a su vez al Imperio Español a introducir a millones de esclavos secuestrados en el África subsahariana. Simultáneamente y a pesar de la prohibición impuesta por los estatutos de limpieza de sangre, se produjo un generalizado mestizaje de la población, en el que los hombres españoles mantuvieron relaciones sexuales—muchas veces forzadas —con decenas y hasta cientos de mujeres indígenas y negras. Esta situación causó un proceso de aculturación en los sectores no nacidos en España y de ambigüedad ante el hecho de la conquista. El artista argentino Víctor Heredia expresa este dilema en su obra Taki Ongoy:
  
  Lo que debiéramos averiguar de una vez por todas a esta altura es ¿quiénes somos?, ¿los conquistadores o los conquistados?
  Víctor Heredia13
  El 20 de noviembre de 1542, el rey Carlos I de España firmó en Barcelona por real cédula las llamadas Leyes Nuevas, un conjunto legislativo para las Indias entre las cuales dispuso la creación del Virreinato del Perú en reemplazo de las antiguas gobernaciones de Nueva Castilla y Nueva León, al tiempo que la sede de la Real Audiencia de Panamá fue trasladada a la Ciudad de los Reyes o Lima, capital del nuevo virreinato.
  
  y te ordenamos y mandamos que en las provincias o reinos del Perú resida un virrey y una audiencia real de cuatro oidores letrados y el dicho virrey presida en la dicha audiencia la cual residirá en la ciudad de los reyes por ser en la parte mas convenible porque de aquí adelante no ha de haber audiencia en panamá.
  Leyes Nuevas
  El flamante virreinato comprendió en un inicio y durante casi trescientos años gran parte de Sudamérica y el istmo de Panamá, bajo diversas formas de control o supervigilancia de sus autoridades. Abarcaba una inmensa superficie que correspondía a los actuales territorios que forman parte de las repúblicas de Argentina, Uruguay, Paraguay, Bolivia, Colombia, Chile, Ecuador, Panamá, Perú y toda la región oeste y sur del Brasil. Quedaban exceptuadas Venezuela, bajo jurisdicción del Virreinato de Nueva España a través de la Real Audiencia de Santo Domingo, y Brasil, que integraba el Imperio portugués.
  
  
  Imperio español de Felipe II, Felipe III y Felipe IV (de 1556 a 1665) incluyendo los territorios cartografiados y reclamados, reclamaciones marítimas (mare clausum) y otros aspectos.
  
  Audiencias del Virreinato del Perú, hacia 1650: (1) Real audiencia de Panamá, (2) Real audiencia de Santa Fe de Bogotá, (3) Real audiencia de Quito, (4) Real audiencia de Lima, (5) Real audiencia de La Plata de los Charcas y (6) Real audiencia de Chile.
  En el período virreinal la mayor parte del actual territorio argentino no pudo ser conquistado por el Imperio español, debido a la resistencia opuesta por los pueblos indígenas que habitaban esos territorios, principalmente en las llanuras chaqueña, pampeana y la Patagonia.
  
  En la pampa y la Patagonia dominaron los pueblos tehuelches hasta que en el siglo xviii ingresó un gran contingente mapuche proveniente de la región de Arauco, mapuchizando los pueblos que habitaban la Patagonia norte y la pampa, región que tomó el nombre de Puelmapu.
  
  En la llanura chaqueña dominaron los pueblos wichi y kom. En la región de los ríos alto Paraná y alto Uruguay los jesuitas instalaron misiones indígenas guaraníes organizadas como repúblicas teocráticas de tipo comunitario, con el fin de proteger a sus miembros de las prácticas esclavistas de los encomenderos españoles y los bandeirantes portugueses, que llevó a la Guerra Guaranítica entre 1754 y 1756.
  
  La zona del Río de la Plata fue disputada en el período entre el Imperio español y el Imperio portugués, dentro de la confrontación que ambas potencias mantenían a escala global, generando una fuerte confrontación entre brasileños y rioplatenses que llegó al enfrentamiento bélico en la Guerra de los Siete Años y luego durante la guerra hispano-portuguesa de 1776-1777.
  
  Expediciones iniciales al Río de la Plata
  Los primeros europeos que llegaron a lo que actualmente es la Argentina, lo hicieron buscando un paso hacia el continente asiático. Por entonces América era solo un obstáculo entre España y las riquezas de Catay y Cipango en Asia. La zona, además, estaba ubicada aproximadamente sobre la Línea de Tordesillas, la división del mundo que se estableció por tratado entre España y Portugal y por lo tanto tenía, para ambos países la condición de frontera aún no ocupada.
  
  Aunque existen muchas discusiones sobre la autenticidad de los viajes de Américo Vespucio, varios historiadores aceptan como un hecho que participó de la primera expedición europea (portuguesa) en llegar al actual territorio argentino, más específicamente al Río de la Plata en 1502.
  
  En 1516 el navegante español Juan Díaz de Solís visitó lo que actualmente se conoce como Argentina, navegando el actual Río de la Plata, al que denominó Mar Dulce por su escasa salinidad. Llegó hasta la actual isla Martín García14 y murió tras navegar un breve trecho del río Uruguay. Al regresar la expedición a España, una de las carabelas naufragó en Santa Catarina, quedando abandonados allí dieciocho náufragos. Uno de ellos, Alejo García, fue el primero en conocer la leyenda del Rey Blanco, sobre un país rico en plata, realizando una excursión hasta la región de Potosí en donde se halla el Cerro Rico, donde se hizo de un enorme tesoro de piezas de plata. Al volver murió en un combate con los indios payaguaes.
  
  En 1519 y 1520 Fernando de Magallanes recorrió toda la costa de la actual Argentina durante la Expedición de Magallanes-Elcano, hasta el estrecho que lleva su nombre, al que llegó el 21 de octubre de 1520.
  
  En 1525 fray García Jofre de Loaísa dirigió una expedición que recorrió la Patagonia e incluso se establecieron brevemente en el Puerto Santa Cruz para reparar dos naves.
  
  En 1526 el italiano Sebastián Gaboto tomó contacto en Santa Catarina (en Brasil) con los guaraníes que habían pertenecido a la expedición de Alejo García y decidió ir hacia el Imperio de Plata, navegando aguas arriba el río de la Plata conocido entonces como río de Solís. El 9 de junio de 1527 Gaboto ordenó establecer dos fuertes: uno en el actual territorio uruguayo (San Salvador) y otro, al que llamó Sancti Spiritus, primer asentamiento europeo en el actual territorio argentino, en la actual provincia de Santa Fe. Un expedicionario de Gaboto, Francisco César, llegó posiblemente a Córdoba. Gaboto remontó también el río Paraná, el río Paraguay y el río Bermejo.
  
  Diego García de Moguer llegó a Sancti Spiritus poco después de Gaboto e intentó imponer su autoridad. Sin embargo el hambre y las derrotas con los timbúes y charrúas los obligaron a volver a España, donde difudieron las noticias sobre el Rey Blanco y el Río de la Plata.
  
  Portugueses y españoles aceleraron entonces los planes para tomar posesión de esa región, que ambos consideraban estaba de su lado de la Línea de Tordesillas.
  
  En 1531 Portugal envió una gran expedición al mando de Martín Alfonso de Souza para tomar posesión del río de la Plata y expulsar a los españoles. Llegó hasta la isla Martín García, que rebautizó Santa Ana. Se internó por el río Uruguay y se enteró de que los españoles del fuerte de San Salvador habían sido derrotados. Decidió entonces retirarse al cabo de Santa María (donde actualmente se encuentra La Paloma, Uruguay). Allí realizó mediciones astronómicas y llegó a la conclusión de que estaba del lado español de la Línea de Tordesillas, por lo que volvió a Portugal sin realizar fundación alguna.
  
  Colonización del Río de la Plata (1527-1580)
  En la exploración y conquista que Sebastián Caboto hizo del Río de la Plata, el 9 de junio de 1527 construyó un fuerte en la desembocadura del río Carcarañá en el río Paraná, a unos 50 km al norte de la actual ciudad de Rosario, al que dio el nombre de Sancti Spiritus. Este fue el primer establecimiento español en lo que hoy día es la República Argentina. Cerca de su ubicación se levantó después el pueblo de Gaboto, en la provincia de Santa Fe, para conmemorar el hecho.
  
  En una expedición posterior, en febrero de 1528, Diego García de Moguer al mando de una expedición de tres naves, se detuvo a explorar la zona del Río de la Plata. Navegando en abril por el río Paraná, encontró de improviso el fuerte Sancti Spiritus. Sorprendido e indignado, ordenó al capitán Caro (designado por Sebastián Gaboto), que abandonase el lugar, ya que esa era conquista que solo a él le pertenecía por haber sido designado por Castilla para explorar esas tierras. Pero vencido por los ruegos de Caro y su gente para que fuese en auxilio de Gaboto, García siguió aguas arriba y entre lo que hoy día son las localidades de Goya y Bella Vista se encontró con el piloto veneciano, quien le obligó a cooperar en la búsqueda de la Sierra de la Plata, y juntos exploraron el río Pilcomayo, para seguir después hacia el estrecho.
  
  A todo esto, en Sancti Spiritus, los españoles descuidaron la defensa del fuerte, y en septiembre de 1529, antes del amanecer, los indígenas tomaron por asalto la fortaleza. Sebastián Gaboto y Diego García de Moguer se encontraban en ese tiempo en el asentamiento de San Salvador, preparando hombres y embarcaciones, y no sabían nada de lo que se estaba desarrollando en Sancti Spiritus, hasta que vieron llegar a Gregorio Caro con los supervivientes, y la terrible noticia de la destrucción del fuerte. Inmediatamente Gaboto y García se dirigieron al fuerte intentando rescatar a sus hombres. En los alrededores de Sancti Spiritus hallaron algunos cadáveres completamente mutilados; los bergantines defondados y hundidos, los almacenes saqueados e incendiados. Solo dos cañones quedaron como testigos de la primera fortaleza que se levantó en tierra argentina.
  
  El 24 de agosto de 1534, Diego García de Moguer, viaja de nuevo en la carabela Concepción hacia el río de la Plata, pasa por la isla de Santiago de Cabo Verde, luego al Brasil, donde desciende el estuario de los ríos Uruguay y Paraná y funda el primer asentamiento de la ciudad de Santa María del Buen Aire.
  
  En 1536 Pedro de Mendoza fundó el Puerto de Santa María del Buen Ayre. Sin embargo, el asentamiento fracasó debido a las hambrunas y los enfrentamientos con las tribus indígenas. Algunos de los habitantes de la población, privados de alimentos y sitiados por los indígenas locales, se vieron llevados al canibalismo. La ciudad fue abandonada, y sus pobladores se establecieron en Asunción, que se constituyó en centro de operaciones español en la región.
  
  
  Mapa del Paraguay o Provincia del Río de la Plata, alrededor de 1600
  Para 1573, no existían poblaciones hechas por europeos a lo largo del río Paraná, territorio al que cronistas como Martín del Barco Centenera, llamaban el «Argentino Reyno». Es así que Juan de Garay, partiendo de la ciudad de Asunción, acompañado por los mancebos de la tierra y los planos de la ciudad, fundan Santa Fe en los márgenes de este gran río, como nudo de comunicaciones entre la salida del Río de la Plata y el Paraguay, con el Tucumán y Cuyo, el Alto Perú y Chile. Resulta así que esta ciudad histórica, se transforma en la primera planificada en el territorio, sobre la base de los ideales arquitectónicos renacentistas. Mientras que en Europa, este modelo no se pudo llevar a cabo, América en general y Santa Fe en particular, son evidencias concretas de este nuevo proceso de urbanización planificado en cuadrículas, con un orden preestablecido a diferencia de las anteriores poblaciones. Elementos que hoy pueden verse claramente en el Parque Arqueológico de Santa Fe la Vieja en Cayastá.15
  
  En este Argentino Reyno, solo Santa Fe existió por varios años y es allí en donde viven los primeros pobladores a quienes se llamó argentinos. Martín del Barco Centenera da cuenta de ello en su poema histórico "La Argentina", publicado en 1602.16
  
  En 1580, saliendo desde Santa Fe, Juan de Garay refundó la Ciudad de la Trinidad y Puerto de Santa María de los Buenos Ayres, que con el tiempo sería conocida simplemente como Buenos Aires. Esta ciudad formaba parte de la Gobernación de la Nueva Andalucía, dentro del Virreinato del Perú, con sede en Lima.
  
  En el siglo xvii se establecieron las misiones jesuíticas guaraníes. Fueron pueblos misionales fundados por la "Compañía de Jesús" entre los guaraníes y pueblos afines, que tenían como fin evangelizar a los indios de las actuales provincias de Misiones y Corrientes, en Argentina, y de importantes territorios actualmente en el Paraguay. Cumplieron exitosamente su tarea hasta que en el año 1768, el rey español Carlos III ordenó expulsar a los jesuitas.
  
  Colonización del Tucumán (1549-1593)
  En 1549, el capitán Juan Núñez de Prado fue premiado por el Virrey del Perú. Pocos años antes los dominios españoles en los territorios incas habían sufrido una grave crisis. Tras las denuncias de Fray Bartolomé de las Casas, el Emperador Carlos V dictó nuevas leyes que daban grandes derechos a los indios: se prohibía el esclavizarlos, torturarlos, convertirlos forzosamente al cristianismo, y enajenar sus tierras. También se prohibía la transmisión de encomiendas por herencia. Esto generó la Gran Rebelión de Encomenderos, en la que a duras penas el gobierno real pudo imponer los nuevos derechos para los indios. Por su destacada labor, Juan Núñez de Prado recibió la autorización para ocupar y gobernar las tierras del Tucumán.
  
  Al año siguiente (1550) Juan Núñez de Prado y sus compañeros fundaron la ciudad de El Barco. Esto generó una protesta por parte de Francisco de Aguirre, que reclamaba todo el Tucumán como parte de la Capitanía de Chile: en 1553 De Aguirre logró su cometido, y trasladó a los pobladores fundando la ciudad de Santiago del Estero del Nuevo Maestrazgo. Según los estudios de Narciso Binayán Carmona, tres siglos más tarde la totalidad de los criollos en el Norte de la Argentina sería descendiente de alguno entre los 103 miembros de la expedición de Núñez de Prado.
  
  Los españoles buscaron consolidar el dominio en la región fundando ciudades en puntos clave:
  
  En 1558 Juan Pérez de Zurita fundó Londres de la Nueva Inglaterra, en la actual provincia de Catamarca. Londres fue destruida en 1560 durante la primera guerra Calchaquí, pero más tarde fue refundada. Ese alzamiento indígena logró mantener a los españoles fuera de algunos territorios y causó que el Tucumán pasara de la jurisdicción chilena a la peruana.
  En 1561 Juan Pérez de Zurita fundó la ciudad de Nieva, luego refundada como San Salvador de Jujuy.
  El sobrino de Aguirre, Diego de Villarroel fundó en 1565 la ciudad de San Miguel de Tucumán.
  Jerónimo Luis de Cabrera fundó en 1573 la ciudad de Córdoba de la Nueva Andalucía
  En 1582, Hernando de Lerma fundó la Ciudad de Salta.
  Juan Ramírez de Velasco, al frente de la Gobernación del Tucumán, fundó la ciudad de Todos los Santos de la nueva Rioja en 1591, refundó la ciudad de Londres en 1592, y fundó San Salvador de Jujuy en 1593.
  
  Colonización del Cuyo (1560-1594)
  La Crónica de Fray Reginaldo de Lizárraga contrapone la conquista de Chile con la menos gloriosa (según él) colonización de Cuyo. La colonización no resultó dificultosa y fue completamente pacífica, ya que una embajada Huarpe cruzó los Andes para solicitar a los españoles les enviaran sacerdotes y arquitectos que les enseñaran a construir ciudades. En 1561 los españoles fundaron Mendoza del Nuevo Valle de La Rioja, seguida por San Juan de la Frontera en 1562 y San Luis de la Punta de los Venados en 1594.
  
  Influencia jesuítica hasta su primera expulsión (1585-1767)
  
  Vista de la Manzana Jesuítica en el siglo XVIII. Dichos edificios aún se conservan. En la esquina se observa la iglesia de la Compañía de Jesús. A continuación se destacan la antigua sede de la Universidad de Córdoba (actual museo y biblioteca mayor) y el Colegio Monserrat.
  
  Misiones jesuíticas guaraníes.
  Aunque ya en 1512 la Monarquía Hispánica acometió las reformas necesarias para regular su trato de forma oficial y abolir la esclavitud indígena mediante las Leyes de Burgos,17 se ha atribuido a la bula del papa Pablo III Sublimis Deus de 1537, que declaró a los indígenas hombres con todos los efectos y capacidades de cristianos,18 cuyo efecto en la colonización española se dio en el mestizaje, el cual fue excepcional: la conquista católica habría buscado incorporar a los indígenas a su civilización y su Iglesia, aun a costa de la anulación de su identidad cultural.[cita requerida]
  
  En 1585 los jesuitas llegan a Santiago del Estero y en 1587 a Córdoba. En 1588 fundaron las primeras Misiones jesuíticas guaraníes y en el mismo año llegan al Río Salado para evangelizar a los pampas.
  
  Desde su llegada, los jesuitas erigieron a Córdoba como el centro de la Provincia Jesuítica del Paraguay, en el Virreinato del Perú. Para ello necesitaban un lugar donde asentarse y así iniciar la enseñanza superior. Fue así que 1599, y luego de manifestarle dicha necesidad al cabildo, se les entregaron las tierras que hoy se conocen como la Manzana Jesuítica.19
  
  Las primeras manifestaciones culturales y científicas en el actual territorio argentino fueron realizadas por las órdenes religiosas, en especial la de los jesuitas que han hecho numerosas contribuciones significativas al desarrollo de la ciencia y han sido descritos como "el principal contribuyente a la física experimental en el siglo diecisiete."20
  
  En 1613 con apoyo del Obispo Trejo, fue fundada la Universidad jesuítica de Córdoba, la más antigua del país y una de las primeras de América, que dictaba enseñanza en arte, teología y, a fines del siglo xviii, jurisprudencia. Ese año también se crea la Librería Grande (hoy Biblioteca Mayor), que según registros llegó a contar con más de cinco mil volúmenes. Ésta, como el resto de las universidades del imperio español, participó activamente en el esplendor cultural del Siglo de Oro, gracias al movimiento innovador liderado por la Escuela de Salamanca.
  
  En 1624 fue fundada la Universidad Mayor Real y Pontificia San Francisco Xavier de Chuquisaca que aunque no exactamente en el actual territorio argentino desde su creación tuvo una notable influencia.
  
  La red de 25 universidades virreinales del Imperio español fundadas por toda América a lo largo de casi dos siglos,21 difundió los importantes avances del Siglo de Oro Español. También el Camino Real Intercontinental, que afectó a la ruta del mercurio y de la plata de la Monarquía Hispánica que supuso una parte esencial en el comercio entre Europa y América entre los siglos XVI y XVIII, así como contactos culturales e innovaciones tecnológicas.22
  
  En 1609 se funda la primera de las misiones jesuíticas guaraníes. Las treinta misiones llegaron a ser, en el siglo xviii, un verdadero emporio comercial, un "estado dentro del estado" como lo denominaban sus detractores, que se estableció como un sistema de organización económica y social distinto al de las colonias que las rodeaban. Su autonomía y la adaptación de la organización social comunitaria de los guaraníes a un nuevo contexto permitió al sistema subsistir y progresar. Las misiones eran pueblos indígenas, administrados por los mismos guaraníes (bajo la mirada paternalista de los misioneros), donde la tierra se dividía en dos: la tupá mbaé (propiedad de Dios), comunitaria, y la avá mbaé (propiedad del hombre), para la explotación familiar. El excedente era comercializado por todas las colonias circundantes (el Plata, Tucumán, el Brasil y hasta el Alto Perú y España) y les proporcionaba medios a los jesuitas para expandir las misiones y mantener sus colegios y universidades (como los que tenían en Córdoba, centro regional de la Compañía de Jesús).
  
  Los principales productos comercializados por las misiones eran la yerba mate, el tabaco, el cuero y las fibras textiles. Sin embargo, las misiones debieron soportar un fuerte asedio de los bandeirantes, partidas de portugueses que se internaban en la selva para "cazar indios" con el objeto de venderlos como esclavos en su base de San Pablo, que irónicamente nació como reducción jesuita). Las Misiones jugaron un papel clave en la defensa del Paraguay y el Río de la Plata de la expansión portuguesa. Justamente, después de la batalla de Mbororé, en 1641 (que duró 10 días), en la que un ejército de guaraníes al mando de los jesuitas (muchos de los cuales habían sido antes soldados) derrotó a una bandeira (un ejército lusobrasileño de bandeirantes), que se les permitió por primera vez a los indígenas utilizar armas de fuego (si bien solo las de menor calibre). Estos ejércitos misioneros fueron de gran utilidad durante los enfrentamientos entre España y Portugal en el Río de la Plata.
  
  No solo a trabajar, rezar y pelear les enseñaron los jesuitas, sino también música y otras artes (de las que aún se pueden admirar se destacan las "barrocas" arquitecturas exornadas con relieves barrocos resaltados en las piedras sillares o tallados en los rojos ladrillos de tipo romano. Es así que, luego de la expulsión de los jesuitas, muchos guaraníes se trasladaron a las ciudades coloniales, como Corrientes, Asunción o Buenos Aires, donde se destacaron como compositores y maestros de música, plateros y pintores.
  
  Los primeros Jesuitas llegan a Buenos Aires durante el gobierno de Hernandarias en 1608 y fundan el Colegio de San Ignacio y en 1675 fundan el Real Colegio de San Carlos.23 En 1654 el Cabildo de Buenos Aires encomendó a los jesuitas atender la educación juvenil de la ciudad.
  
  Los sacerdotes de la Compañía de Jesús, se instalaron al sur del Río Salado entre 1740 y 1753, con el fin de establecer una población permanente en la frontera del estado colonial. Su intención fue la de hacer sedentarios e instruir a los indígenas en la doctrina cristiana. La primera reducción, fue la "Reducción de Nuestra Señora en el Misterio de su Concepción de los Pampas", fundada en 1740 en la margen sur del Río Salado, por los padres Manuel Quevedo y Matías Strobel. La segunda fue la "Reducción de Nuestra Señora del Pilar de Puelches", fundada en 1746 cercana a la margen de la actual Laguna de los Padres, por los misioneros Joseph Cardiel y Tomás Falkner. Finalmente, la "Misión de los Desamparados de Tehuelches o de Patagones", fue fundada en 1749 a cuatro leguas al sur de la anterior, por el padre Lorenzo Balda. Allí lograron evangelizar a un gran número de indios pampas. Strobel medió entre las autoridades de Buenos Aires y los pampas para establecer la paz entre ellos. Falkner y su colega jesuita Florián Paucke recogieron una gran información acerca de las costumbres y usos de los indios pampas y guaraníes que plasmaron en libros y exquisitos dibujos que dieron origen a la etnografía en el actual territorio argentino.
  
  
  Arte de la lengua guaraní, impreso en Misión jesuítica de Santa María la Mayor en 1724.
  En las Misiones jesuíticas guaraníes publicaron libros en guaraní sobre gramática, catecismo, manuales de oraciones y hasta un diccionario. Las reducciones contaron con la primera imprenta fundada por los padres Juan Bautista Neuman y José Serrano, quienes armaron una prensa, fundieron los tipos necesarios y publicaron los primeros libros. Las impresiones se hicieron en Nuestra Señora de Loreto, San Javier y Santa María la Mayor.
  
  El primer libro publicado fue el Martirologio Romano en 1700; más adelante el Flos Sactorum del padre Pedro de Ribadeneyra en edición guaraní, y De la diferencia entre lo temporal y lo eterno del padre Juan Eusebio Nieremberg. Fue muy rica y variada la producción bibliográfica, conservándose todavía la mayoría.
  
  La Expulsión de los jesuitas del Imperio Español de 1767 hizo que 2630 jesuitas tuvieran que dejar Iberoamérica, lo que significó un terrible golpe a nivel educativo, ya que la inmensa mayoría de las instituciones educativas del territorio estaban a cargo de ellos como profesores.24
  
  Véase también: Universidades españolas en el Siglo de Oro
  Véase también: Misiones jesuíticas guaraníes
  Véase también: Anexo:Jesuitas científicos
  Descubrimiento y toma de posesión de la Antártida
  
  Mapamundi de Abraham Ortelius (1570), donde aparece la Terra Australis Incognita, este mapa como en el de Martin Waldseemüller es uno de los primeros que representa al "Nuevo Mundo" (América) separado de la Terra Incognita por el estrecho de Magallanes aunque el marino al servicio de España llamado Fernando de Magallanes en realidad lo que había descubierto era el estrecho interoceánico que hoy lleva su apellido, en cuanto a la real separación entre América y la Antártida, la misma fue descubierta en 1526 por el español Francisco de Hoces y por este motivo los expertos en geografía denominan al área oceánica en cuestión: Mar de Hoces.
  El navegante español Gabriel de Castilla zarpó de Valparaíso en marzo de 1603 al mando de tres naves en una expedición encomendada por su primo hermano, el virrey del Perú Luis de Velasco y Castilla, para reprimir las incursiones de corsarios neerlandeses en los mares al sur. Al parecer esa expedición alcanzó los 64° de latitud sur. No se han hallado aún en archivos españoles documentos que confirmen la latitud alcanzada y si realizaron avistamientos de tierras, sin embargo, el relato del marinero neerlandés Laurenz Claesz (en un testimonio sin fecha, pero probablemente posterior a 1607), documenta la latitud y la época. Claesz declara que él:
  
  ha navegado bajo el Almirante don Gabriel de Castilla con tres barcos a lo largo de las costas de Chile hacia Valparaiso, i desde allí hacia el estrecho [de Magallanes], en el año de 1604; i estuvo en marzo en los 64 grados i allí tuvieron mucha nieve. En el siguiente mes de abril regresaron de nuevo a las costas de Chile.
  El 30 de abril de 1606 Pedro Fernández de Quirós tomó posesión de todas las tierras del sur hasta el Polo para la corona de España en la isla Espíritu Santo en Vanuatu, a la que llamó Austrialia del Espíritu Santo pensando que era parte de la Terra Australis Incognita.25
  
  Otra suposición es que en el siglo xviii la península Antártica y los archipiélagos de las Antillas del Sur fueron frecuentemente visitados por cazadores de focas españoles e hispanoamericanos, quienes habrían ocultado los territorios en cuestión para evitar la competencia (en especial de los británicos). La presencia de estos cazadores estaría atestiguada por el encuentro de posibles restos de sus refugios en las costas orientales de la península Antártica.
  
  Artículo principal: Antártida Argentina
  Consolidación española (1600-1776)
  
  Mapa de las ciudades españolas fundadas en la Argentina y el Paraguay hasta el año 1600.
  Al comienzos del siglo xvii las ciudades fundadas por los españoles no eran más que pequeñas atalayas de civilización europea esparcidas en un territorio muy vasto, y durante esos cien años fueron aumentando su influencia a través de encomiendas de la formación de estancias y de la fundación de ciudades, que iban alejándose progresivamente del Camino Real. Si bien eran comunes las refriegas fronterizas, no hubo grandes conquistas como en el siglo anterior: más bien se consolidó el dominio de los territorios ya conquistados.
  
  En 1599 los jesuitas se instalaron en Córdoba, y en 1613 fundaron una universidad en esa ciudad. Al mismo tiempo fueron fundando asentamientos entre los indios guaraníes y guaycurúes. Las Misiones Jesuíticas estaban subordinadas a la Corona Española. Como cualquier otra ciudad española tenían un cabildo, un corregidor, alcaldes de primero y segundo voto, escribano, y todas las demás instituciones de la civilización española: la diferencia era que el corregidor y el resto de las autoridades eran casi siempre caciques.
  
  En 1663, por orden del capitán general de las provincias del Río de La Plata y presidente de la Real Audiencia de Buenos Aires José Martínez de Salazar26 fue instituido el El Camino Real de Buenos Aires a Lima con dos vías principales: el Camino Real del Perú que seguía en líneas generales el itinerario de la actual Ruta Nacional 9 de la Argentina desde Buenos Aires, pasando por Córdoba, Santiago del Estero, San Miguel de Tucumán, Salta, San Salvador de Jujuy, Potosí, llegando hasta el Perú y el Camino Real del Oeste que continuaba hacia San Luis, Mendoza y Santiago en Chile y que recorría un trazado similar a la Ruta Nacional 7.27
  
  Comparada con otras partes de Latinoamérica, la esclavitud jugó un rol relativamente pequeño en el desarrollo de la economía argentina, debido principalmente a la falta de minas metalíferas y de plantaciones de caña de azúcar, que habrían demandado una enorme cantidad de mano de obra esclava.28 El Brasil colonial, por ejemplo, importó prácticamente 2.5 millones de africanos en el siglo xvii.28 En contraste, un estimado de 100 000 esclavos africanos arribó al puerto de Buenos Aires en los siglos XVII y XVIII; la gran mayoría de ellos estaban destinados a Paraguay, Chile y Bolivia.28 El mercado del Alto Perú facilitó la plantación de algodón en Santiago del Estero y el establecimiento de una incipiente industria textil, en la cual se elaboraba el algodón junto con la lana de caprinos, ovinos y auquénidos en los territorios de las actuales provincias de Santiago del Estero, Catamarca, Salta, La Rioja así como de talabartería en Tucumán. Por otra parte la ciudad de Córdoba se encontraba beneficiada al ser la encrucijada de las rutas que unían el oeste con el este y el norte con el sureste del virreinato.29
  
  Esta base económica, con un norte metalífero y un sur agrícola y portuario significó el desarrollo de un tránsito carretero que generalmente bajaba desde el Alto Perú hasta el puerto de Buenos Aires siguiendo el Camino Real, tal tránsito supuso por su parte la cría de mulas, también de caballos y asnos) la cual se realizaba principalmente en las ciudades del Tucumán y promovió la fabricación de carretas fabricadas en San Miguel de Tucumán y en la ciudad de Mendoza. La zona de las Misiones y el Paraguay fue sede de cultivos de yerba mate, cultivos iniciados por guaraníes y jesuitas. La yerba mate abastecía a casi todo el virreinato e incluso a la Capitanía General de Chile. Otros cultivos alimenticios surgieron merced a la demanda altoperuana: vinos (en Salta, Tarija, Cuyo, Córdoba), aguardientes y singanis; e incluso plantaciones de olivo, principalmente en La Rioja y Catamarca29`,
  `Creación del Virreinato del Río de la Plata (1776-1814)
  A lo largo del siglo xviii, los cambios políticos llevados adelante por la Casa de Borbón que reemplazó a la Casa de Austria a partir del 16 de noviembre de 1700 en el Imperio español transformaron las dependencias americanas, hasta entonces «reinos» relativamente autónomos, en colonias enteramente dependientes de decisiones tomadas en España en beneficio de ella.30 Entre estas medidas se contó la fundación del Virreinato del Río de la Plata en 1777, que reunió territorios dependientes hasta entonces del Virreinato del Perú, y dio una importancia singular a su capital, la ciudad de Buenos Aires, que había tenido escasa importancia hasta ese momento.31
  
  En 1776, los españoles separaron el Virreinato del Perú, estableciendo entre otras nuevas zonas administrativas al Virreinato del Río de la Plata. La enorme superficie que abarcaba el virreinato del Perú dificultaba las tareas de gobierno, lo cual fue un poderoso motivo para su división. Buenos Aires se estableció como capital, por su creciente importancia como centro comercial y el valor del estuario del río de la Plata como entrada hacia el interior del continente.
  
  Este virreinato abarcó lo que hoy es la Argentina, Uruguay y Paraguay, así como también la mayor parte de la actual Bolivia. Según el censo ordenado por Carlos III, en 1778 el virreinato tenía una población de 186 526 habitantes. Córdoba tenía 44 506, La ciudad de Buenos Aires 37 679, mientras que Mendoza tenía un cuarto 8765. Era importante la población afroargentina, que superaba el 50 % en Santiago del Estero y Catamarca.32
  
  En un principio, la ciudad de Buenos Aires había sufrido serios problemas de aprovisionamiento de bienes básicos, ya que el comercio exterior era monopolizado por España y dicho país priorizaba el puerto de Lima, dado que en el Perú se extraían grandes cantidades de oro y plata para la metrópoli, productos ausentes en los alrededores de Buenos Aires. Como consecuencia, se produjo un fuerte desarrollo del contrabando. La principal producción de Buenos Aires por aquel entonces era el cuero.
  
  España impuso el cristianismo y el idioma castellano. En toda la Hispanoamérica regían las costumbres y modas españolas, aunque las diferentes etnias y culturas criollas que integraron la población colonial también encontraron mecanismos para preservar algunos aspectos de sus patrimonios culturales, lingüísticos y religiosos, que muchas veces se fusionaron entre sí para generar nuevas manifestaciones culturales. La densidad de población en el Virreinato del Río de la Plata era baja, y hasta mediados del siglo xix más de la mitad del territorio argentino actual estuvo habitado por las tribus indígenas.
  
  España impuso en sus colonias americanas un sistema de castas con tres grupos principales, blancos, indios y negros, así como también los grupos derivados del mestizaje de los demás: mulato, mestizo, zambo. Los híbridos se consideraban «manchados» o de «sangre impura», pero existían diferencias entre ellos ya que, mientras la «sangre india» «manchaba» por tres generaciones, la «sangre negra» «manchaba» para toda la eternidad. En la cima del sistema de castas se encontraban los españoles peninsulares, considerados de «sangre pura» a los que se reconocía la mayor cantidad de privilegios, seguidos de los españoles americanos, conocidos como «criollos», descendientes legítimos de padre y madre españoles. Si bien existía una diferencia conceptual entre peninsulares y criollos, ellos no tenían ninguna diferencia de derechos: hubo varios criollos que fueron virreyes, en el Plata Vértiz. En el lugar más bajo de la escala social se encontraban los «negros» ocupando el último lugar aquellos nacidos en África.3334
  
  Sin embargo, dicha separación no era tan estricta, y sus convenciones solían ser postergadas si las necesidades prácticas así lo requerían.35 Así, durante las Invasiones Inglesas se dieron armas y rangos militares a varios grupos que en circunstancias normales no podrían acceder a tales puestos, y la escasez de mujeres españolas promovió el mestizaje. Del mismo, y teniendo como una de sus bases económicas la ganadería extensiva o el acarreo y faena de grandes rebaños, surgieron los mancebos de la tierra ya en el siglo xvii y luego los gauchos, los cuales tendrían un rol decisivo en la gesta emancipatoria del siglo xix.
  
  Descubrimiento, asentamiento y gobernación en las Islas Malvinas
  
  Mapamundi de Diego Ribero (1529), en el que se incluye a las Islas de San Antón en sorprendente concordancia geográfica con las islas Malvinas. Biblioteca Apostólica Vaticana, Ciudad del Vaticano.
  Las bulas Inter Caetera y Dudum si Quidem de 1493 le adjudicaban al Reino de España «todas aquellas islas y tierras firmes, encontradas y que se encuentren, descubiertas y que se descubran hacia el mediodía», fijada en una línea a cien leguas de las islas Azores. Las Islas Malvinas, incluidas en las zonas aludidas por las bulas, fueron avistadas por primera vez en 1520 por Esteban Gómez con la nave San Antonio de la expedición española de Fernando de Magallanes. Las islas comienzan a aparecer en los mapas Pedro Reinel (1522-1523), Diego Rivero (1526-1527 y 1529), Islario de Santa Cruz (1541), Sebastián Gaboto (1544), Diego Gutiérrez (1561), Bartolomé de Olivos (1562), entre otros. Gran Bretaña afirma que las islas fueron descubiertas por John Davis en 15923637
  
  
  El original asentamiento de Puerto Soledad. Dom Pernety, 1769.
  El 31 de enero de 1764 el francés Louis Antoine de Bougainville arribó a las islas, a las que nombró Illes Malouines debido a que los colonos que traía a las islas provenían de la ciudad francesa de Saint-Malo.38 El 17 de marzo fundó una colonia en la isla Soledad, a la que llamó Port Saint-Louis y el 5 de abril de 1764 tomó posesión formal del territorio en nombre de Luis XV.39 pero en 1765 España y Francia llegaron a un acuerdo para el reconocimiento de las Islas como posesión española que incluía una indemnización por gastos realizados a Louis Antoine de Bougainville.40 Por tal motivo, el 2 de octubre de 1766 el rey Carlos III de España dictó una real cédula por la cual creaba la Gobernación de las Islas Malvinas como dependencia del gobernador y capitán general de Buenos Aires, en ese momento Francisco de Paula Bucarelli y Uruzúa, nombrando al capitán de navío Felipe Ruiz Puente como primer gobernador del territorio. Así el primer poblado pasó de manos francesas a Españolas. Al asumir Felipe Ruiz Puente como primer gobernador español de las Malvinas se instaló en Port Saint-Louis y procedió a construir varios edificios comunes como cocinas y cuarteles, y una capilla consagrada a Nuestra Señora de la Soledad, nombre que reemplazó al topónimo francés del puerto y derivó finalmente en el de toda la isla.
  
  En este Puerto de Nuestra Señora de La Soledad se radicó la sede de gobierno de la Gobernación de las Islas Malvinas (posteriormente Comandancia). Los sucesivos gobernadores de las islas (hubo 18 en total)41 cumplieron la tarea de inspeccionar regularmente las costas; el lugar era habitualmente visitado por loberos y balleneros ingleses y norteamericanos.424344 La población de las islas estaba compuesta por oficiales, soldados y presidiarios, estos últimos pertenecientes a la cárcel instalada en 1780.
  
  Tras los primeros conatos independentistas en el virreinato, el gobernador de Montevideo, Gaspar de Vigodet decidió reunir todas las fuerzas militares de las que disponía a fin de enfrentar a los revolucionarios de Mayo, por lo que ordenó evacuar las Malvinas. En enero de 1811 España abandonó las islas con intenciones de volver, luego de 37 años de ocupación indiscutida y dejando también placas en el campanario de la capilla y en los edificios principales, en la que afirmaba su soberanía sobre las islas:
  
  Esta isla con sus Puertos, Edificios, Dependencias y cuanto contiene pertenece a la Soberanía del Sr. D. Fernando VII Rey de España y sus Indias, Soledad de Malvinas 7 de febrero de 1811 siendo gobernador Pablo Guillén.45
  Artículo principal: Historia de las islas Malvinas
  Argentina parte del Puelmapu (1650-1880)
  
  Mapa de Puelmapu en los siglos XVIII y XIX, territorio mapuche al este de la Cordillera de los Andes surgido de la araucanización de dicho territorio y pueblos que lo habitaban. En el mapa además se muestran las fronteras nacionales actuales y los límites provinciales argentinos.
  
  El malón (1845) por Mauricio Rugendas.46
  En los siglos XV y XVI los tehuelches, ubicados en las llanuras pampeano-patagónicas comienzan a migrar hacia la zona cordillerana bajo dominio pehuenche, pertenecientes a la cultura mapuche. En la misma época los huarpes ubicados en el territorio actual de Mendoza se desplazan hacia el sur estableciendo relaciones amistosas con los pehuenches.
  
  A partir de 1608 las incursiones esclavistas en territorio del pueblo Cunco (sur actual chileno), perteneciente a la nación mapuche, comenzó a impulsar una migración a través del paso Pehuenche desde el lado occidental al lado oriental de la cordillera de los Andes, instalándose en la región y dando comienzo a lo que será conocido como el proceso de mapuchización de las culturas tehuelche.47
  
  Terminada la Guerra de Arauco en 1656 los mapuches comienzan a expandir su presencia en el norte de la Patagonia y la pampa, instalando fütalmapus o confederaciones, con sus correspondientes aillarehues (federaciones provinciales) y lovs (clanes). El proceso se consolidó en el siglo xviii, asimilando culturalmente las parcialidades tehuelches y la adopción de la lengua mapudungun (que influirá también los dialectos españoles de la región), así como las leyes o admapu y costumbres mapuches.47
  
  La expansión de los pueblos indígenas por las llanuras pampeanas y patagónicas fue promovida por la adopción del caballo introducido por los españoles, transformándose en hábiles jinetes. A medida que el territorio pampeano se fue poblando de animales vacunos salvajes, reorientaron su economía hacia la caza de vacunos, manzanas en el valle del actual río Negro o Curu Leuvu y también a la extracción de sal obtenida en las grandes salinas de la región, a la vez que establecieron nuevas rutas comerciales con el valle central de Chile.47 Uno de los asentamientos más importantes fue el de los ragkülche o ranqueles, que instalaron sus aillarehues a lo largo del río Chadileuvú, Salado o Desaguadero y el sector del Salinas Grandes, controlando la pampa.47
  
  El malón fue una táctica militar ofensiva empleada por araucanos, que consistía en el ataque rápido y sorpresivo de una nutrida partida de guerreros a caballo contra un grupo enemigo, ya fueran otros pueblos o parcialidades indígenas, o poblaciones, fortificaciones y estancias de los criollos, con el objetivo de matar adversarios y saquear para hacerse con ganado, provisiones y prisioneros, sobre todo mujeres jóvenes y niños.484950
  
  El malón fue utilizado en la extensa área de la frontera sur de la entonces Capitanía General de Chile y del Virreinato del Perú y del posterior Virreinato del Río de la Plata, que eran jurisdicciones políticas dependientes de la corona española, perviviendo hasta comienzos del siglo xx en los territorios de los nuevos estados surgidos a consecuencia de la independencia de Argentina y Chile.
  
  En 1790 el Imperio Español celebró el primero de tres tratados con los mapuches relativos al Puel Mapu (Tratado de Paz con el Cacique Callfilqui de 1790, Tratado de Paz con los Indios Ranqueles de 1796 y el Tratado entre los Pehuenches y la provincia de Mendoza 1799), que complementaban los que venían celebrando con el sector mapuche del otro lado de la cordillera.51
  
  Aunque en los textos de Bartolomé Mitre y de Estanislao Zeballos o en las cartas y documentos de Juan Manuel de Rosas, que son de la época, no existe la palabra mapuche, se habla solo de pampas, puelches, ranqueles, etc., se cree que los mapuches terminaron conformando en el siglo xviii una zona de influencia llamada Puelmapu o Puel Mapu, que se extendía desde la cordillera de los Andes, el río Limay y el Curu Leuvu o río Negro por el sur, en la región del Neuquén, hasta el río Cuarto por el norte y el océano Atlántico por el este. El Puel Mapu ya figura constituido en el Parlamento de Lonquilmo de 1784.47
  
  La gran migración mapuche a la pampa y la Patagonia atlántica, comenzó en 1833.46
  
  Surgimiento del Estado nación (1806-1852)
  Artículo principal: Surgimiento del Estado argentino
  Véanse también: Revolución de Mayo, Independencia de la Argentina, Declaración de independencia de la Argentina, Guerras civiles argentinas y Período de las Autonomías Provinciales (Argentina).
  La tradicional historiografía latinoamericana y argentina ha interpretado que los movimientos de independencia de las colonias españolas iniciados a comienzos del siglo xix, constituyeron un momento de ruptura con el colonialismo occidental, que dio paso a la creación de estados-nación independientes de los imperios europeos. Distanciados de esa visión, varios científicos sociales sostienen que los procesos de independencia política, no rompieron con los procesos profundos de la colonialidad, creando "estados criollos republicanos" o "estados coloniales", independientes pero que mantuvieron las lógicas racistas de exclusión que caracterizó al colonialismo, tanto en el orden interno, como global.5253545556
  
  En 1806 y 1807, en el marco de las Guerras Napoleónicas en Europa, tuvieron lugar las Invasiones Inglesas al Río de la Plata. Sir Home Riggs Popham y William Carr Beresford encabezaron la primera, que desembarcó en la zona de Quilmes y tomó el control de la ciudad de Buenos Aires durante 45 días hasta su expulsión por parte de un ejército proveniente de Montevideo encabezado por Santiago de Liniers. En 1807 un segundo ataque aún más grande (de unos 8000 soldados), encabezado por John Whitelocke, logró ser resistido con éxito.
  
  El conflicto tuvo consecuencias políticas: se creó un quiebre del derecho institucional vigente en el virreinato; el virrey Rafael de Sobremonte fue destituido por huir durante la invasión, y el victorioso Liniers fue elegido por aclamación popular, sin intervención directa del Rey de España. Durante el segundo conflicto, los soldados eran insuficientes y no podía contarse con el auxilio de la metrópoli, por lo que sectores postergados de la población recibieron armamento y mando de tropas. Esto les permitió tener mayor injerencia en los asuntos de la vida pública. Entre ellos se destacaba el Regimiento de Patricios, compuesto por criollos y comandado por Cornelio Saavedra.
  
  
  El Cabildo Abierto del 22 de mayo de 1810.
  La Independencia de los Estados Unidos (1776), la Revolución francesa (1789) y las nuevas ideas de la Ilustración, se combinaron con las tradiciones de lucha de criollos, indígenas y afroamericanos contra el Imperio español para impulsar las ideas de libertad, igualdad e independencia en Latinoamérica.
  
  La Revolución de Mayo de 1810 destituyó y expulsó al virrey Baltasar Hidalgo de Cisneros, y proclamó, tras un Cabildo Abierto, el primer gobierno formado en su mayoría por criollos en las Provincias Unidas del Río de la Plata, denominado la Primera Junta.
  
  Entre 1810 y 1820 se sucedieron dos juntas de gobierno, dos triunviratos y el Directorio, una forma unipersonal y centralista de gobierno. En este período, la principal preocupación de los gobiernos era consolidarse en el orden interno y enfrentar la resistencia de los Ejércitos realistas en América (defensores del statu quo y del mantenimiento de los lazos que unían estas regiones a la corona española). En 1816 se declaró la independencia de las Provincias Unidas de América del Sur en el Congreso de Tucumán.
  
  Campaña libertadora
  Artículos principales: Guerra de la Independencia Argentina y Guerras civiles argentinas.
  
  Retrato de José de San Martín. 1828
  José de San Martín, Manuel Belgrano y Martín Miguel de Güemes fueron algunos de los principales comandantes patriotas en la guerra de independencia. A Belgrano se le encargó la dirección del Ejército del Norte y, aunque fue derrotado por los realistas, sentó las bases para que el Paraguay formase un gobierno propio, en 1811. En 1812 creó la bandera de la Argentina y dirigió el Éxodo Jujeño, tras lo cual se impuso a los españoles en las batallas de Tucumán y Salta.
  
  En 1816, San Martín organizó el Ejército de los Andes conformado por 4000 hombres y, desde 1817 hasta 1822, encabezó las campañas libertadoras que llevarían a la independencia de Chile y Perú. Al mismo tiempo, Simón Bolívar independizaba a la Gran Colombia, completaba la independencia de Perú y liberaba a Bolivia (1824), el último bastión del dominio español en Sudamérica.
  
  El Estado argentino considera a San Martín como el mayor héroe militar de su independencia y lo honra con el título de "Padre de la Patria". Entre las mujeres se destacaron Mariquita Sánchez de Thompson, organizadora de cenáculos patrióticos y precursora del feminismo, y Juana Azurduy, militar heroína de la lucha por la independencia en el Alto Perú y primera generala del Ejército Argentino, ascendida post-mortem en 2009.
  
  Campañas en el extranjero
  El franco-argentino Hippolyte Bouchard luego llevó su flota para hacer la guerra contra España en el extranjero y atacó la California española, la Chile española, la española Perú y la española Filipinas. Consiguió la lealtad de los filipinos fugitivos en San Blas que desertaron de los españoles para unirse a la armada argentina, debido a los conflictos entre argentinos y filipinos contra la colonización española.5758 Un hermano del libertador de Argentina, Juan Fermín de San Martín, también fue inmigrante a Filipinas. En una fecha posterior, el Sol de mayo de los argentinos fue adoptado como un símbolo por los filipinos en la Revolución filipina contra España. Bouchard, también obtuvo el reconocimiento diplomático de Argentina por parte del rey Kamehameha I del Reino de Hawái. El historiador Pacho O'Donnell afirma que Hawái fue el primer Estado que reconoció la independencia de Argentina.59
  
  Guerra civil
  Desde antes de 1820, unitarios y federales se disputaron el gobierno y la economía del país a través de una serie de guerras civiles. Con la Batalla de Cepeda, un triunfo federal, comenzó el Período de las Autonomías Provinciales; la unión entre las provincias solo se mantuvo gracias a los «tratados interprovinciales». Las luchas internas —en general, las del interior contra Buenos Aires— se mantuvieron por más de 60 años. Los caudillos dominaron el mapa político a mediados del siglo xix, dirigiendo grandes ejércitos propios, y en muchos casos gobernando sus provincias.
  
  Entre 1820 y 1824 gobernó Buenos Aires Martín Rodríguez, cuyo ministro Bernardino Rivadavia realizó reformas —como la primera ley electoral en 1821, aplicada solo a la provincia de Buenos Aires— y con el fin de incrementar las arcas del Estado firmó un empréstito con la Baring Brothers y se apoderó de todos los bienes que pertenecían a las órdenes religiosas, incautó los bienes del Santuario de Luján, de los de la Hermandad de Caridad, del Hospital de Santa Catalina y otros.60 En defensa de los bienes de la Iglesia católica en Argentina y el anticatolicismo de Rivadavia, el 19 de marzo de 1823 estalló la "Revolución de los Apostólicos" encabezada por Gregorio García de Tagle pero fracasó después de horas de lucha.
  
  Los despojos arbitrarios y unilaterales de la administración rivadaviana junto con el rol de la Iglesia católica en la génesis de la nacionalidad son causa de la reparación que fundamenta el actual sostenimiento del culto reglamentado por la Ley 21.540 sobre la "Asignación a determinados dignatarios pertenecientes al Culto Católico Apostólico Romano".61
  
  En 1824, Juan Gregorio de Las Heras sucedió a Rodríguez como gobernador de Buenos Aires, que reunió el Congreso, por el cual se pretendió unificar el país.
  
  En 1825, con el apoyo del gobierno argentino, un grupo de orientales y de otras provincias, llamados los Treinta y Tres Orientales, liderados por Juan Antonio Lavalleja, ingresó en la Provincia Oriental para desalojar a los ocupantes brasileños quienes, con la posterior ayuda de Fructuoso Rivera, en pocos meses lograron retirar al ejército brasileño y, el 25 de agosto, en el Congreso de Florida, declararon la independencia del territorio oriental del Brasil y su unificación con las provincias que conformaban las Provincias Unidas del Río de la Plata o Argentina. Brasil declaró la guerra a Argentina. En 1826, el Congreso nombró presidente a Rivadavia, de tendencia centralista, que continuó con la política económica librecambista que venían llevando adelante los gobiernos porteños, y que tiene su base en las ganancias que genera el puerto de Buenos Aires.
  
  Las islas Malvinas con bandera argentina (1810-1833)
  
  La toma de posesión argentina de 1820 se conoció en el Reino Unido a través de los informes del célebre explorador británico James Weddell. La noticia también fue publicada en The Times el 3 de agosto de 1821.62 El Reino Unido no protestó la ocupación argentina en 1820, ni realizó reserva de soberanía al firmar el (aún vigente) Tratado de amistad, comercio y navegación de 1825.6364
  La Argentina sostiene que, con su independencia, heredó los derechos de España en virtud de la doctrina del uti possidetis iuris y de la de «sucesión de estados», por lo que ejerció un «dominio eminente» a partir de 1810. Al reconocer España la independencia argentina en 1859, cedió en forma explícita y retroactiva al 25 de mayo de 1810 sus derechos sobre el territorio argentino, que incluirían a las Malvinas.65
  
  El 6 de noviembre de 1820, el coronel estadounidense al servicio de las Provincias Unidas del Río de la Plata, David Jewett, al comando de la fragata Heroína realizó en Puerto Soledad la toma de posesión de las islas Malvinas en nombre del Gobierno de esas Provincias Unidas, que era el nombre de la Argentina usado entonces.
  
  Jewett hizo izar por primera vez la bandera de Argentina en el territorio y repartió comunicaciones al respecto a los cazadores de lobos marinos y de ballenas, que de varias nacionalidades estaban allí. El explorador británico James Weddell fue testigo del hecho.
  
  La noticia tuvo difusión en la prensa de Europa. Las islas quedaron bajo pacífica posesión de las Provincias Unidas hasta la ocupación británica de 1833.6667686970
  
  El 2 de febrero de 1825 el Reino Unido firmó un tratado de amistad, comercio y navegación mediante el cual reconoció la independencia de las Provincias Unidas y la existencia de un ámbito territorial propio de ella, incluyendo las Malvinas, que habían tomado posesión en 1820, y ejercido otros actos de soberanía incluyendo el nombramiento y la instalación de autoridades.71727367 Además se debe sumar que en el trado el Reino Unido no expresó pretensión alguna a las islas74 y que el tratado implicó la admisión de las consecuencias jurídicas de tal reconocimiento.67
  
  El 10 de junio de 1829, con el fin de reforzar la presencia del Estado argentino, el gobernador delegado de Buenos Aires, Martín Rodríguez, y su ministro Salvador María del Carril, por intermedio de un decreto ley crearon la Comandancia Política y Militar de las Islas Malvinas y adyacentes al Cabo de Hornos en el Mar Atlántico, con sede en la isla Soledad y con jurisdicción sobre las islas adyacentes al cabo de Hornos que dan hacia el océano Atlántico Sur. Luis Vernet fue el primer titular del cargo.
  
  El 5 de febrero de 1830 nació en Puerto Soledad Matilde Vernet y Sáez. La hija de Vernet fue la primera persona de la que se tenga registro en nacer en las Malvinas y primer descendiente de argentinos antes de la ocupación británica del territorio en 1833.7576
  
  Artículos principales: Toma de posesión argentina de las islas Malvinas, Historia de las islas Malvinas, Comandancia Militar de las Islas Malvinas y Comandancia política y militar de las Islas Malvinas.
  Presidencia de Rivadavia y guerra con el Brasil (1826-1828)
  Artículos principales: Bernardino Rivadavia y Guerra del Brasil.
  
  Retrato de Bernardino Rivadavia, durante su estadía como enviado diplomático en Londres
  En 1826, los representantes de las provincias de la antigua unión se vieron en la necesidad de reunirse para lograr un frente unificado contra el Brasil. Rivadavia, de trayectoria diplomática en Europa y conocida su obra como ministro de Gobierno de Martín Rodríguez, fue elegido presidente por treinta votos contra cinco. Durante su mandato encaminó a las Provincias Unidas a su unidad, anhelada por él, y necesaria en el momento.
  
  El 9 de febrero de 1826, el presidente envió al Congreso el proyecto de Ley de Capital, pues para gobernar el país necesitaba un espacio territorial desde donde hacerlo. Fue aprobado por 25 votos. En contra, se manifestaron 14. La ley establecía como capital del Estado a la ciudad de Buenos Aires, ampliando sus límites territoriales. La capital no estaba sujeta a la subordinación de la provincia. Con el resto de Buenos Aires, se creaba una nueva provincia, que perdía su ciudad cabecera, su puerto, y por lo tanto sus ingresos económicos más fuertes.
  
  Otra ley fue la de creación del Banco Nacional, cuyo nombre oficial fue Banco de las Provincias Unidas del Río de la Plata, con un capital de 10 000 000 de pesos. Este se integraba con 3 000 000 provenientes de un préstamo realizado por la provincia de Buenos Aires, 1 000 000 del Banco de Descuentos, y una suscripción anual para integrar acciones por un monto de $ 200 cada una. La administración del Banco estaría a cargo de un Directorio.
  
  El 18 de mayo de 1826, se dictó la Ley de Enfiteusis por la cual las tierras públicas cuya venta había sido prohibida por estar afectadas a la garantía de la deuda con Inglaterra, se entregaban en enfiteusis por no menos de 20 años, contados a partir del 1 de enero de 1827.
  
  La culminación normativa fue la Constitución de 1826. En sus 191 artículos agrupados en 10 secciones, organizaba al país bajo el sistema representativo, republicano y unitario. En la última sección se imponía la presentación del texto constitucional a la aprobación de las provincias y de la capital. Las primeras se manifestaron en desacuerdo. Esta oposición fue el golpe final para el Congreso.
  
  Rivadavia fomentó las sociedades por acciones, con capitales británicos, para la explotación de recursos minerales
  
  En lo que hace a la guerra, si bien al comienzo de las hostilidades las fuerzas imperiales eran mayores a las republicanas, las Provincias Unidas derrotaron a Brasil en muchas batallas en una lucha de tres años por tierra y mar; siendo la Batalla de Ituzaingó, la más importante.
  
  Sin embargo, los problemas económicos y políticos generados en ambos estados, en especial, el bloqueo de la Armada de Brasil al puerto de Buenos Aires y el impase en tierra (dado que Colonia del Sacramento y Montevideo estuvieron bajo el control de Brasil durante todo el conflicto) aconsejaron iniciar las tratativas de paz.
  
  En 1827, el ministro plenipotenciario argentino Manuel José García, excediéndose en su misión, firmó un acuerdo preliminar de paz con los brasileños que reconocía la soberanía del Imperio sobre la Provincia Oriental y se comprometía a pagarle a Brasil una indemnización de guerra. El presidente Rivadavia lo declaró como el «tratado deshonroso», rechazándolo y presentando su renuncia.
  
  El conflicto continuó hasta el 27 de agosto de 1828, cuando los representantes del gobierno de la República de las Provincias Unidas del Río de la Plata, y el Emperador del Brasil, firmaron la Convención Preliminar de Paz, que acordó la independencia de la Provincia Oriental y el cese de las hostilidades.
  
  Gobierno de Juan Manuel de Rosas (1829-1852)
  Artículo principal: Época de Rosas
  En 1829 Juan Manuel de Rosas, federal y porteño, asumió el gobierno de la provincia de Buenos Aires, con "Facultades Extraordinarias", y conservando la delegación de las relaciones exteriores por parte de las demás provincias. Gobernó hasta 1832 con mano de hierro y fuertes rasgos personalistas. Realizó una campaña en la Patagonia, donde luchó contra algunas tribus indígenas y negoció con otras, para ampliar la frontera hacia el sur del país. Desde 1832 hasta 1835 se sucedieron tres gobernadores débiles: Juan Ramón Balcarce, Juan José Viamonte y Manuel Vicente Maza. Los tres renunciaron por presión del rosismo, y el último a causa del asesinato del caudillo Facundo Quiroga en Barranca Yaco, ideado por los hermanos cordobeses Reynafé. En 1833, Gran Bretaña ocupó las Islas Malvinas.
  
  
  Retrato del Brig. Gral. Juan Manuel de Rosas 1845
  En 1835, en medio de esta anarquía, Rosas fue elegido gobernador de Buenos Aires, con el agregado de tener la "Suma del Poder Público", es decir, los tres poderes del Estado resumidos en su persona. Un posterior plebiscito popular legitimó en forma amplia su designación. Inició una política económica proteccionista, aunque sin fomentar en forma explícita nuevas industrias, y realizó pactos interprovinciales (como el Pacto Federal). También impuso medidas que favorecían a sectores populares como la prohibición total de la compraventa y el tráfico de esclavos negros, que ya habían adquirido la libertad de vientres luego de la revolución de mayo. Inició un régimen que se caracterizó por la persecución de los opositores —bajo el lema "Mueran los salvajes unitarios"— que en muchos casos fueron ejecutados, asesinados u optaron por exiliarse en países limítrofes. Su política centralista desató sublevaciones en su contra en el Interior del país y su autoritarismo generó la oposición de los romanticistas de la "Generación del 37", grupo de jóvenes intelectuales influyentes, entre ellos Juan Bautista Alberdi, Esteban Echeverría, y Domingo Faustino Sarmiento, que desde el Salón Literario criticarán con dureza al régimen.
  
  Entre 1838 y 1840, Rosas enfrentó el bloqueo francés, establecido por el rechazo a aceptar beneficios para ciudadanos franceses. La acción promovió revueltas y unificó a la oposición pero fue levantada, resultó fortalecido Rosas, quien luego venció a la poderosa Coalición de las provincias del Norte y sitió Montevideo entre 1843 y 1851 para ayudar al expresidente uruguayo derrocado Manuel Oribe. Luego en 1845, resistió el Bloqueo naval Anglo-Francés en la Batalla de la Vuelta de Obligado, y logró aplastar una última sublevación de la provincia de Corrientes.
  
  En sus últimos años de gobierno, las renuncias de Rosas se repitieron de manera simbólica; el caudillo entrerriano Justo José de Urquiza aceptó una de ellas con su denominado "Pronunciamiento" y decidió asumir él mismo las Relaciones Exteriores de su provincia. El porteño reaccionó con furiosas invectivas, pero su reacción militar fue insuficiente: se enfrentaron en la Batalla de Caseros el 3 de febrero de 1852. En esta batalla, la más grande de la historia sudamericana, el Ejército Grande de 30 000 hombres comandados por Urquiza, (que incluía tropas de Brasil, Uruguay, Entre Ríos, Corrientes y exiliados políticos), derrotó al ejército federal de 22 000 hombres.
  
  Rosas inició su exilio en Inglaterra. Quince días después, el general victorioso entró en Buenos Aires en un desfile, seguido por fusilamientos de las figuras importantes del rosismo.
  
  Islas Malvinas ocupadas por fuerzas británicas (1833)
  La presencia del Estado argentino en las Islas Malvinas terminó 3 de enero de 1833 a través de una operación militar del Reino Unido de Gran Bretaña e Irlanda que tomó el control de las islas luego de que el 20 de diciembre de 1832 la corbeta estadounidense USS Lexington destruyera las defensas militares del asentamiento argentino de Puerto Soledad, en la isla homónima. A pesar de estar en relaciones de paz con la Confederación Argentina, el Reino Unido, con dos buques de guerra desalojaron a la guarnición argentina de 26 soldados, quienes se marcharon dos días después. Desde entonces, las islas han estado bajo dominio británico, excepto durante el breve período de la Guerra de Malvinas en 1982.
  
  Artículos principales: Toma de posesión argentina de las islas Malvinas, Historia de las islas Malvinas y Ocupación británica de las islas Malvinas (1833).
  Primeras expediciones a la península antártica y mares australes
  En 1815 el comodoro de marina irlandés al servicio de las Provincias Unidas del Río de la Plata, Guillermo Brown, emprendió una campaña para hostigar a la flota española en el océano Pacífico y al transponer el cabo de Hornos con los navíos Hércules y Trinidad los vientos los llevaron hasta el paralelo 65º S. En la memoria naval institucional llamada Acciones navales de la República Argentina, 1813-1828, Brown escribió:77
  Después de dar vuelta el cabo de Hornos y de soportar los vientos reinantes en estos parages, y después de haber llegado hasta los 65 grados de latitud, en cuyo parage la mar se les presentó muy llana con horizonte claro y sereno, sin malos signos, lo que indicaba que no estaban muy lejos de la tierra, el bergantín Trinidad perdió el tajamar …
  Fuentes argentinas mencionan que Brown habría avistado tierras antárticas en esa expedición, afirman que es la razón por la cual en la cartografía suele llamarse Tierra de la Trinidad a la parte más septentrional de la península Antártica (por el navío Trinidad), pero Brown tampoco hizo mención de ese supuesto avistaje en sus Memorias escritas cuando ya se conocía la existencia de la Antártida, en las que se refiere al hecho:78
  
  Después de dar vuelta al cabo de Hornos, soportando los acostumbrados temporales de viento de esos mares, el bergantín Trinidad, al mando de D. Miguel Brown, mi hermano, perdió el tajamar (al cual están asegurados los barbiquejos de la roda), exponiendo a peligro inminente al bauprés …
  El 25 de agosto de 1818 el gobierno de las Provincias Unidas del Río de la Plata otorgó las primeras concesiones para la caza de focas y pingüinos en territorios correspondientes al continente antártico a Juan Pedro de Aguirre, quien operaba con los buques Pescadora Director y San Juan Nepomuceno. En el petitorio que Aguirre había presentado el 18 de febrero solicitó autorización para la instalación de un establecimiento para caza de lobos marinos en alguna de las islas a la altura del Polo Sur.
  
  La primera tierra descubierta confirmada al sur del paralelo 60° S fue por el inglés William Smith a bordo del bergantín mercantil Williams, mientras navegaba desde Buenos Aires a Valparaíso, desviado de su ruta al sur del cabo de Hornos, el 19 de febrero de 1819 avistó la extremidad nordeste (punta Williams) de la isla Livingston. Denunció su descubrimiento en Valparaíso, pero no le fue creído y en otro viaje volvió a desviarse alcanzando el 16 de octubre de 1819 la isla Rey Jorge. Bautizó al archipiélago como Nueva Bretaña del Sur y tomó posesión de él a nombre de la corona británica, dando a conocer sus descubrimientos al llegar a Montevideo cuando esta ciudad formaba parte de las Provincias Unidas del Río de la Plata.
  
  El foquero argentino Spiritu Santo al mando del capitán Carlos Tidblom (o Timdblon), fue seguido en septiembre de 1819 desde las islas Malvinas por el brig estadounidense Hercilia (al mando de Nathaniel Palmer) alcanzándolo en la isla Decepción en las Shetland del Sur. El hecho de que estos foqueros se dirigieran a las islas con rumbo fijo suele ser considerado prueba de que las conocían.
  
  El 10 de junio de 1829 el gobierno de la provincia de Buenos Aires dictó el decreto de creación de la Comandancia Político Militar de las Islas Malvinas incluyendo a las islas adyacentes al Cabo de Hornos, lo que interpreta en Argentina como que incluyó a las islas antárticas.`,
  `La Organización Nacional (1853-1880)
  Artículo principal: Organización Nacional (Argentina)
  Véase también: Constitución Argentina de 1853
  Luego de la Batalla de Caseros se firmó el Acuerdo de San Nicolás que convocó a un Congreso Constituyente con el fin de establecer un Estado federal y designó al vencedor de Caseros, Justo José de Urquiza, como director provisorio de la Confederación. La provincia de Buenos Aires, sin embargo, se reorganizó luego de la derrota del rosismo bajo el liderazgo de Bartolomé Mitre del Partido Unitario, y decidió no ratificar el Acuerdo, separándose de la Confederación con el nombre de «Estado de Buenos Aires».
  
  En 1853, trece provincias (Catamarca, Córdoba, Corrientes, Entre Ríos, Jujuy, La Rioja, Mendoza, Salta, San Juan, San Luis, Santa Fe, Santiago del Estero y Tucumán), se reunieron en el Congreso Constituyente de Santa Fe y sancionaron la Constitución de 1853 que constituyó la República Argentina —conocida hasta 1860 como Confederación Argentina— sobre la base de principios republicanos, representativos, federales y liberales.
  
  Los pueblos originarios que habitaban los territorios indígenas de la Patagonia (selknam, yaganes, tehuelches, mapuches y ranqueles) y el Gran Chaco (guaicurúes, matacos, vilelas) no formaban parte de ninguna provincia y su eventual representación no fue contemplada. Años después la República Argentina conquistó esos territorios mediante la guerra, organizando a la población en una serie de entidades llamadas «territorio nacionales» que carecieron de representación y derechos políticos hasta sus respectivas provincializaciones más de un siglo después —Misiones, La Pampa, Chaco, Formosa, Neuquén, Río Negro, Chubut y Santa Cruz serían provincializadas a mediados del siglo xx y Tierra del Fuego, Antártida e Islas del Atlántico Sur lo serían en 1991.
  
  En las elecciones presidenciales de 1853, Urquiza fue elegido presidente de la Confederación.
  
  Sin un puerto importante para comerciar, las economías de las provincias de la Confederación se verían muy afectadas por la separación de Buenos Aires, razón por la cual recomenzó la guerra civil. Tras la Batalla de Cepeda (1859), el Pacto de San José de Flores, la Reforma constitucional de 1860 y la Batalla de Pavón, de 1861, se logró la unificación del país bajo la hegemonía de Buenos Aires y el liderazgo de Bartolomé Mitre, quien asumió de facto la Presidencia de la Confederación sin dejar de ser gobernador de Buenos Aires, mientras Urquiza se retiró para siempre de la política.
  
  Las tres presidencias que se dieron posteriores a la culminación del proceso constituyente originario del Estado y que se prolongaron durante un período de dieciocho años que abarcó desde 1862 hasta 1880 suelen denominarse las presidencias históricas. La tercera de ellas, en cabeza de Nicolás Avellaneda, daría inicio a la larga hegemonía de 42 años sin alternancia, del Partido Autonomista Nacional.
  
  Mitre
  En 1862 Mitre, a la cabeza del Partido Nacionalista confirmó su poder y resultó elegido presidente constitucional. Inició una política de codificación, sancionó importantes leyes y promovió la inmigración y la educación. Combatió con brutalidad las resistencias de los caudillos provinciales, en especial la de Chacho Peñaloza.
  
  El Paraguay de Francisco Solano López había invadido y ocupado Corrientes, la Argentina se alió con Brasil y Uruguay para derrocarlo mediante la Guerra de la Triple Alianza.7980 Otra versión da cuenta de que la guerra se debió al cierre de la salida al mar de la nación más desarrollada por entonces, en una entente en la que Brasil y Argentina fueron estimulados por Inglaterra.81 El que se pensaba sería un conflicto de rápido desenlace, concluyó en 1870 luego de seis años, que dejó al Paraguay devastado y se cobró la vida de 30 000 soldados argentinos.
  
  Sarmiento
  Sería sucedido por Domingo Faustino Sarmiento en 1868, que realizó el primer Censo Nacional de Población, promovió la educación popular, la cultura y los telégrafos. Luchó contra los últimos caudillos federales derrotándolos, y se firmaron importantes tratados internacionales, además de finalizar la Guerra de la Triple Alianza. Incentivó la inmigración europea que siguió hasta mitad del siglo xx. Entre 1871 y 1915, la Argentina recibió casi 5 000 000 de inmigrantes, sobre todo europeos, de pueblos y culturas diversas.
  
  Avellaneda
  Tras una pequeña crisis económica, Sarmiento fue sucedido por Nicolás Avellaneda (1874), del recién creado Partido Autonomista Nacional (PAN), que se mantendría en el poder sin alternancia durante cuarenta y dos años, hasta 1916, utilizando un régimen de voto cantado y mínima representatividad, que permitía el fraude electoral generalizado. Avellaneda emprendió la conquista de los territorios indígenas. Continuó la política de fomento de la inmigración europea, promovió la industrialización y sancionó una Ley de Tierras favoreciendo el latifundio, aunque durante su período debió enfrentar una seria recesión económica a consecuencia del Pánico de 1873. En 1878 se efectuó la Expedición Py que aseguró la soberanía argentina al sur del río Santa Cruz, en momentos en que amenazaba un conflicto con Chile.
  
  
  Conquista del Desierto 1878–1885
  
  El malón, 1845, óleo de Mauricio Rugendas.
  En 1879 se llevó a cabo la Conquista del Desierto la cual logró, por medios bélicos, el objetivo de hacer ejercer el efectivo dominio del estado nacional sobre millones de hectáreas de la llanura pampeana occidental y el norte de la Patagonia, que se encontraban bajo el control de los pueblos mapuche, ranquel y tehuelche. Esta campaña, liderada por el ministro general Julio Argentino Roca eliminó la amenaza de los malones sobre la antigua línea de la frontera con los pueblos indígenas del sur, al costo de miles de indígenas —mayoritariamente mujeres y niños— que fueron esclavizados y en beneficio de unos pocos estancieros. Un sector de la historiografía y de las organizaciones sociales, políticas y de derechos humanos, considera que se trató de un genocidio. Años después se aplicó una metodología similar sobre los territorios chaqueños. Mediante ambos procesos se logró casi triplicar la superficie del país, incluyendo territorios pretendidos por otros países, consolidando de este modo las fronteras. Como contracara, provocó una drástica reducción de la población aborigen de dichas regiones.
  
  En 1880 estalló en Buenos Aires una última guerra civil por el control del Estado y en contra del generalizado fraude electoral, habitual en la segunda mitad del siglo xix en el país, liderado por Carlos Tejedor y Bartolomé Mitre; su derrota, que dio fin al período de las guerras civiles argentinas, permitió sancionar la Ley 1029 —previa cesión del territorio por la provincia de Buenos Aires— que federalizaba la Ciudad de Buenos Aires, transformándola en capital del país.
  
  Roca
  Poco después, Roca asumió la Presidencia e inició un plan de construcción de obras públicas a lo largo de todo el país. Con él se inició un período de más de tres décadas de gobiernos conservadores y liberales, sostenidos por prácticas electorales fraudulentas.
  
  La República Conservadora (1880-1916)
  Artículo principal: República conservadora (Argentina)
  Durante este período predominó el Partido Autonomista Nacional (PAN) que monopolizó el poder sobre la base de elecciones fraudulentas, propiciado por el sistema del voto cantado y durante 25 años, la figura excluyente fue el general Julio Argentino Roca.
  
  Se sucedieron en la presidencia Julio A. Roca (1880-1886), Miguel Juárez Celman, quien dimitió en 1890 como consecuencia de la revolución del parque encabezada por Leandro N. Alem — que fue sofocada — y le sustituyó el vicepresidente Carlos Pellegrini (1890-1892). Le siguieron en el poder Luis Sáenz Peña (1892-1895), José Evaristo Uriburu (1895-1898), Julio Argentino Roca (1898-1904), Manuel Quintana (1904-1906), José Figueroa Alcorta (1906-1910), Roque Sáenz Peña (1910-1914) y Victorino de la Plaza (1914-1916).
  
  La República Conservadora se instaló en el momento que el Imperio Británico alcanzaba la hegemonía mundial luego de vencer a China en la Segunda Guerra del Opio (1856-1860) e imponía un esquema de división internacional del trabajo que reservaba a los países del norte de Europa el papel de productores de bienes industriales. En ese esquema, se insertó con un relativamente exitoso y moderno modelo agroexportador, destinado a producir alimentos baratos (carne y cereales) para la clase obrera industrial inglesa, en las fértiles tierras de la llanura pampeana de propiedad de un pequeño grupo de estancieros mayoritariamente porteños, mientras que los capitales británicos tomaban el control mayoritario de los ferrocarriles, frigoríficos y bancos.
  
  A tal fin, los gobiernos conservadores, también conocidos como la Generación del 80, introdujeron algunas técnicas modernas de agricultura y ganadería, construyeron una extensa red ferroviaria con eje en Buenos Aires y sus puertos, promovieron una gran ola de inmigración europea (1870-1930) (mayoritariamente campesinos italianos y en segundo lugar españoles) que llevó la población argentina del 3,5 % al 11,1 % en 1930, como porcentaje de la población de América Latina.82
  
  El historiador británico Niall Ferguson sostiene que las inversiones del Imperio Británico en Argentina y Brasil eran de tal magnitud que resulta legítimo calificar esa situación como "imperialismo informal".83 Esta condición de "colonia informal" sería reivindicada por el gobierno argentino durante la Década Infame de 1930, cuando la Gran Depresión puso en crisis el modelo global del Imperio Británico.84
  
  Las inversiones, provenientes sobre todo del Estado argentino y del Reino Unido, fueron destinadas a áreas como el desarrollo ferroviario, los puertos y los frigoríficos. Gran parte de la inmigración y las actividades económicas modernas se alejaron del interior del país, impulsando la concentración del desarrollo y de las riquezas en la ciudad de Buenos Aires; que se convierte en una ciudad próspera y cosmopolita.
  
  Sin embargo, estos modelos económicos también fueron generando una fuerte acumulación de la riqueza en las manos de la aristocracia ganadera bonaerense; y la exclusión, hacinamiento o segregación de la clase trabajadora. Simultáneamente el país se desarrolló asimétricamente, con una fuerte postergación del llamado «interior», un término creado para mencionar al territorio argentino que no es Buenos Aires.
  
  A su vez la inmigración también trajo de Europa los ideales socialistas y anarquistas, que los conservadores se encargaron de combatir y reprimir, incluso prohibiendo la entrada al país.
  
  El PAN dominó mediante el fraude electoral la política argentina hasta 1916, cuando la Ley Sáenz Peña de sufragio secreto y universal (para varones) sancionada cuatro años antes, permitió el triunfo electoral de la Unión Cívica Radical, liderada por Hipólito Yrigoyen. Los radicales, que habían protagonizado diversos intentos revolucionarios en contra de lo que denominaban el régimen alentaban la expansión de una incipiente clase media argentina.
  
  La Revolución del '90
  Artículo principal: Revolución de 1890
  Véase también: Golpes de estado en Argentina
  
  Revolucionarios del Parque junto a un cañón.
  El 26 de julio de 1890 se produjo un golpe de Estado conocido como «Revolución del Parque» dirigido por la recién formada Unión Cívica, liderada por Leandro Alem, Bartolomé Mitre, Aristóbulo del Valle, Bernardo de Irigoyen y Francisco Barroetaveña, entre otros, que perseguía el derrocamiento del gobierno encabezado por el presidente Miguel Juárez Celman.
  
  El golpe fue precedido por una grave crisis económica que se había prolongado por dos años, así como denuncias de corrupción y autoritarismo por sus opositores. Se formaron una Junta Revolucionaria y una logia militar conocida como la Logia de los 33 oficiales. Entre sus líderes estaba el subteniente José Félix Uriburu que 40 años más tarde encabezaría el golpe de Estado que derrocó a Hipólito Yrigoyen.
  
  El plan era que las fuerzas rebeldes se concentrarían en el Parque de Artillería y la flota bombardearía la Casa Rosada y el cuartel de Retiro. Al mismo tiempo, grupos de milicianos debían tomar prisioneros al presidente Juárez Celman, el vicepresidente Pellegrini, al ministro de Guerra general Levalle, y al presidente del senado Julio Argentino Roca, y cortar las vías de ferrocarril y telegráficas.
  
  Ese día el levantamiento comenzó en la madrugada del 26 de julio de 1890. Un regimiento cívico armado tomó el estratégico Parque de Artillería de la Ciudad de Buenos Aires, donde hoy se levanta el edificio de la Corte Suprema de Justicia), ubicado 900 metros de la casa de gobierno y simultáneamente otros contingentes sublevados marcharon hacia allí desde otros puntos. Al mismo tiempo se sublevó la mayor parte de la escuadra naval ubicada en el puerto de la Boca del Riachuelo, al sur de la Casa Rosada, luego de un cruento enfrentamiento armado. Las tropas revolucionarias contaban con el apoyo de civiles armados organizados en «milicias cívicas».
  
  El sitio principal donde se concentraron las fuerzas del gobierno fue el Retiro, en la zona noreste de la ciudad. Allí existía un importante cuartel en el lugar en que hoy se encuentra la Plaza San Martín y la terminal de ferrocarril de Retiro, estratégica para traer las tropas ubicadas en las provincias. En Retiro se instalaron desde las 6:00 los hombres clave del gobierno: el presidente Miguel Juárez Celman, el vicepresidente Carlos Pellegrini, el presidente del Senado Julio Argentino Roca, el ministro de Guerra, general Nicolás Levalle, quien tomaría el mando directo de las tropas leales, y el jefe de Policía coronel Alberto Capdevila.
  
  Una vez que el gobierno se encontró reunido en el cuartel de Retiro, Juárez Celman salió de Buenos Aires aconsejado por Pellegrini y Roca que de ese modo quedaron a cargo del mando político.
  
  Una vez concentradas las tropas revolucionarias en el Parque de Artillería, el general Manuel J. Campos cambió el plan establecido la noche anterior, y en lugar de atacar las posiciones del gobierno y tomar la Casa Rosada, dio la orden de permanecer en el interior del Parque. La gran mayoría de los historiadores atribuye la decisión a un acuerdo secreto entre Campos y Roca; este último habría fomentado la revuelta para provocar la caída del presidente Juárez Celman, pero evitando un triunfo de los rebeldes que hubiera instalado a Leandro Alem como presidente provisional.
  
  La flota sublevada se ubicó detrás de la Casa Rosada y comenzó a bombardear al azar el cuartel de Retiro, el Cuartel de Policía y la zona aledaña al sur de la ciudad, y la Casa Rosada. La lucha continuó hasta el 29 de julio en que los rebeldes se rindieron con la condición de que no tomaran represalias con los revolucionarios. La cantidad de víctimas causadas por la Revolución del 90 nunca ha sido bien establecida. Distintas fuentes hablan desde 150 hasta 300 muertos o en forma indiscriminada de 1500 bajas sumando muertos y heridos. El 6 de agosto de 1890 Miguel Juárez Celman renunció a la presidencia y fue reemplazado por el vicepresidente Carlos Pellegrini, quien nombró como su ministro del Interior a Julio Argentino Roca, quien fue el que políticamente más se fortaleció con el golpe frustrado.
  
  La Revolución radical de 1905
  Artículo principal: Revolución radical de 1905
  En 1897 Hipólito Yrigoyen, en desacuerdo con de Bernardo de Irigoyen, disolvíó el Comité de la UCR de la provincia de Buenos Aires, debido a lo cual el partido dejó prácticamente de existir. Esto determinó la formación de un núcleo de radicales que reconocen como jefe a Hipólito Yrigoyen, quien en 1903 comenzó la refundación y reorganización del partido. El 29 de febrero de 1904 el Comité Nacional de la UCR declaró la abstención electoral en todo el país en las elecciones de diputados de la Nación, de senador por la capital, electores de presidente y vicepresidente de la Nación y anunció la lucha armada. En el gobierno estaba Manuel Quintana, representante del Partido Autonomista Nacional.
  
  El 4 de febrero de 1905, en la Capital Federal, Campo de Mayo, Bahía Blanca, Mendoza, Córdoba y Santa Fe, se produjo el alzamiento armado con el propósito de derrocar a las autoridades que, por su parte, estaban al tanto de la conspiración y decretaron el estado de sitio en todo el país, por noventa días.
  
  En la Capital Federal los golpistas fallaron al no poder asegurar el control del arsenal de guerra de Buenos Aires cuando el general Carlos Smith, jefe del Estado Mayor del Ejército desplazó a los soldados yrigoyenistas. Las tropas leales y la policía recuperaron pronto las comisarías tomadas por sorpresa y los cantones revolucionarios. En Córdoba los rebeldes apresaron al vicepresidente José Figueroa Alcorta y amenazaron matarlo si no renunciaba el presidente Manuel Quintana; este no cedió y la amenaza no fue ejecutada. También apresaron al diputado Julio Argentino Pascual Roca, y Francisco Julián Beazley, exjefe de policía de Buenos Aires, pero no al expresidente Julio Argentino Roca, quien logró escapar a Santiago del Estero.
  
  En Mendoza los rebeldes se llevaron 300 000 pesos del Banco de la Nación y atacaron los cuarteles defendidos por el teniente Basilio Pertiné. Las tropas sublevadas en Bahía Blanca y otros lugares ni tuvieron perspectiva, ni hallaron eco en el pueblo. Solo continuaron los combates en Córdoba y Mendoza hasta el 8 de febrero, pero finalmente los alzados fueron derrotados y enjuiciados recibiendo penas de hasta 8 años de prisión y enviados al penal de Ushuaia.
  
  1910: el país del Centenario
  
  Postal conmemorativa de la Revolución de Mayo, de 1910
  1910 fue un año en el que los logros y los fracasos de la Generación del 80 quedaron en evidencia.
  
  El 25 de mayo de 1910 se cumplían 100 años desde la Revolución de Mayo, paso inicial de la independencia. El gobierno argentino, presidido por José Figueroa Alcorta, decidió entonces organizar las festividades del Centenario, como un acontecimiento internacional al que asistieran personalidades de todo el mundo.
  
  Llegaron a Buenos Aires la Infanta Isabel de España, el presidente de Chile Pedro Montt y representantes de numerosos países. Los presidentes de Bolivia y de Brasil estuvieron ausentes debido a las malas relaciones diplomáticas que mantenían con la Argentina.
  
  Buenos Aires fue el centro de los festejos, realizándose diversas ceremonias organizadas por el gobierno y particulares con participación del mundo de la cultura, militares, escolares y de colectividades extranjeras.
  
  Se realizaron desfiles militares, manifestaciones cívicas, y una función de gala en el Teatro Colón. Se crearon monumentos y se reanudó la construcción del Congreso y de la Corte Suprema.
  
  Se organizaron conferencias internacionales y una exposición de bellas artes. Muchos diarios publicaron artículos especiales, entre ellos, el más importante fue el editado por La Nación.
  
  El 25 de mayo, a la madrugada, una marcha de estudiantes se dirigió al Río de la Plata para ver el amanecer. A la mañana en la Plaza de Mayo se colocó la piedra fundamental del monumento a la Revolución de Mayo y en la Plaza del Congreso hubo una reunión de escolares. A las tres de la tarde se realizó un desfile militar.
  
  Sin embargo, de manera paralela a los festejos, los sindicatos expresaron su descontento ante la situación de desigualdad social y económica. La CORA y la FORA, dirigidas por las corrientes socialista, sindicalista revolucionaria y anarquista, realizaron protestas y amenazaron con realizar una huelga general. Pedían la derogación de la Ley de Residencia, que habilitaba al gobierno a expulsar extranjeros sin el debido proceso. El gobierno impuso el estado de sitio y la policía reprimió a los manifestantes. Los partidos obreros se fragmentaron y la huelga no se concretó.
  
  Para la clase alta, el acto del Centenario fue una demostración del poder y grandeza a la europea, que perduraría a través de los años. Para las clases bajas el acto del centenario fue un evento aristocrático y excluyente.
  
  Participación argentina en la exploración antártica y ocupación permanente de la Antártida
  En 1848 el futuro comandante argentino Luis Piedra Buena viajó a la Antártida como grumete del barco de William Smiley.
  
  La Expedición Argentina a las Tierras y Mares Australes de 1881 al mando teniente de la Marina Italiana Giacomo Bove exploró Tierra del Fuego hasta que su barco naufragó. La expedición del rumano Julio Popper se frustró durante su alistamiento por su muerte en 1893.
  
  El 29 de diciembre de 1894 el presidente argentino Luis Sáenz Peña autorizó a Luis Neumayer para explorar el territorio situado al sur de la Patagonia y denominado Tierra de Grand (península Antártica), aunque prohibiendo cualquier tipo de explotación, pero la expedición no se realizó.85
  
  Entre 1897 y 1899 una expedición belga comandada por Adrien de Gerlache, de la que participó Roald Amundsen, debió invernar en la Antártida al quedar encerrada por los hielos.86
  
  El 10 de octubre de 1900 el gobierno argentino decidió incorporarse a la Expedición Antártica Internacional, compuesta de varias expediciones, pero el viaje argentino no se realizó y se ofreció colaboración a la expedición sueca al mando del doctor Otto Nordenskjöld. Este recibiría apoyo argentino a cambio de incorporar a un marino argentino a su expedición y entregarle los datos científicos y las colecciones zoológicas que se recogieran. A su paso por Buenos Aires el alférez de navío José María Sobral se embarcó en el buque Antarctic el 21 de diciembre de 1901. Como no se tenían noticias de la expedición el gobierno argentino cumplió su compromiso de apoyo acondicionando a la corbeta ARA Uruguay, que partió en su búsqueda el 8 de octubre de 1903 al mando del teniente de navío Julián Irízar, rescatando a los integrantes de la expedición que habían quedado invernando a raíz del hundimiento del Antarctic.87
  
  
  Base Primavera, en la península Antártica.
  El 2 de enero de 1904 la Argentina adquirió la estación meteorológica instalada por el escocés William Speirs Bruce, en la isla Laurie de las Orcadas del Sur, en la que había quedado una dotación de seis hombres realizando observaciones científicas. En ella se instaló un observatorio meteorológico, donde funcionaba también una oficina de correos. Al civil —empleado la empresa oficial argentina de correos y telégrafos— argentino Hugo Alberto Acuña le correspondió izar por vez primera de un modo oficial la bandera argentina en el sector Antártico Argentino, el 22 de febrero de 1904.88 Tal observatorio devino en la Base Orcadas, el establecimiento humano permanente más antiguo existente hoy en todo el territorio antártico.
  
  La corbeta argentina ARA Uruguay volvió a la Antártida en 1905 —zarpó desde le puerto de Buenos Aires el 10 de diciembre de 1904— para relevar a la dotación de las Orcadas del Sur y dirigirse a la isla Decepción y luego a la isla Wiencke en busca de Jean-Baptiste Charcot, cuya expedición francesa (1903-1905) se creía perdida. En agradecimiento a la colaboración argentina con su expedición Charcot bautizó a un grupo insular como islas Argentina. Una de esas islas fue nombrada como isla Galíndez en homenaje al capitán de la corbeta, Ismael Galíndez, y otra fue denominada isla Uruguay, en homenaje a la corbeta argentina de tal nombre.89
  
  El gobierno argentino decidió sumar dos observatorios meteorológicos, en la isla Georgia del Sur y en la isla Wandel, a los que ya tenía en las islas Laurie y Observatorio. La expedición que debía instalar uno en el puerto en donde invernó Charcot en 1904 en la isla Wandel (hoy isla Booth) partió de Buenos Aires el 30 de diciembre de 1905 al mando del teniente de navío Lorenzo Saborido en el barco Austral, que era el Le Français comprado a Charcot cuando este viajó a Buenos Aires en febrero de ese año. Luego de relevar a la dotación de las Orcadas del Sur, regresó a Buenos Aires sin poder llegar a la isla Wandel. En un nuevo intento, al mando del teniente de navío Arturo Celery, el 22 de diciembre de 1906 el barco encalló y se hundió en el banco Ortiz del Río de la Plata, por lo que el observatorio nunca se construyó.90 En junio de 1905 el transporte Guardia Nacional al mando del teniente de navío Alfredo P. Lamas llevó adelante la tarea de levantar el observatorio de las Georgias del Sur en la bahía Cumberland, renombrada como «bahía Guardia Nacional».
  
  Un decreto emitido por Chile el 27 de febrero de 1906 cedió la explotación industrial agrícola y pesquera por 25 años, en las islas Diego Ramírez, Shetland del Sur, Georgias del Sur y la Tierra de Graham (Tierra de O'Higgins/San Martín) a Enrique Fabry y a Domingo de Toro Herrera, encargándoseles también el resguardo y la custodia de los intereses soberanos de Chile en la zona. La Argentina protestó formalmente el 10 de junio de 1906 por esas acciones de Chile y al año siguiente Chile invitó al Gobierno argentino a negociar un tratado para dividir las islas y la Antártica continental americana, pero no fue aceptado.
  
  El 21 de julio de 1908 el Reino Unido anunció oficialmente sus reclamos a todas las tierras dentro de los meridianos 20° O a 80° O al Sur del paralelo 50° S, que en 1917 trasladó al sur del paralelo 58º S debido a que con ese reclamo se incluía parte de la Patagonia.
  
  Artículo principal: Antártida Argentina
  El radicalismo en el poder (1916-1930)
  
  Hipólito Yrigoyen es el primer presidente argentino elegido por el voto secreto
  Al llegar el radicalismo al poder, este presentó, más que un programa de gobierno, una declaración de principios: la causa contra el régimen, la reparación histórica, la recuperación de la ética, el respeto al federalismo.
  
  Entre los puntos de la doctrina radical se encontraba el concepto de "la causa contra el régimen". "La causa" era la causa radical, y sus ideales eran el honor del país, la pureza del sufragio, la reorganización del país, la democracia y el respeto a la constitución y las leyes. "El régimen" era el gobierno del PAN; contra este régimen (un régimen corrupto, injusto, etc.) llega "la causa" (la UCR) que viene a sanar los daños hechos por el gobierno del PAN. Otro punto de la doctrina radical era "La reparación histórica". Esta predicaba que el gobierno radical no venía a vengar los daños hechos por el gobierno del PAN sino a sanarlos, a repararlos.
  
  El primer gobierno de Hipólito Yrigoyen (1916-1922)
  Artículo principal: Primer gobierno de Yrigoyen
  En 1916 Hipólito Yrigoyen asumió la presidencia de la nación, gracias a la Ley Sáenz Peña, que establecía el sufragio secreto y universal para varones. Con la primera presidencia de Yrigoyen se inicia un período de la historia argentina conocido como «La etapa radical», que abarca de 1916 a 1930 (año del primer golpe de Estado de la Argentina).
  
  Yrigoyen debió gobernar con un Senado nacional con mayoría conservadora, que tendía a votar negativamente los proyectos de ley propuestos del radicalismo. Por esta razón tomó la decisión de gobernar dictando numerosos decretos. Algo similar sucedió con la estructura federal del país: la mayoría de las provincias tenían gobiernos opositores, situación que lo llevó a intervenir casi todas las provincias.
  
  Durante la primera presidencia de Yrigoyen se cometieron las mayores masacres obreras de la historia argentina y el único pogrom (matanza de judíos) cometido en el continente americano. Durante las huelgas de enero de 1919, tropas militares y policiales de la Nación, con apoyo de grupos de choque fascistas, asesinaron a unas 700 personas, detuvieron a decenas de miles de ciudadanos en lo que fue conocido como la Semana Trágica; en el curso de la misma las fuerzas represivas arrasaron el barrio judío del Once, asesinando, torturando y violando a sus moradores y quemando sus viviendas y libros.91 Entre 1920 y 1922, las tropas privadas de la empresa inglesa La Forestal y la Liga Patriótica Argentina -dirigida por personalidades del partido radical, conservadores, militares, empresariales y eclesiásticas- asesinaron a una 600 personas durante un conflicto laboral en la provincia de Santa Fe.92 En 1921 y 1922 tropas nacionales reprimieron a los obreros en huelga en la Patagonia, asesinando a unas 1500 personas, muchas de ellas fusiladas por bando militar, en lo que se ha conocido como la Patagonia Rebelde.93
  
  En 1918 se inició en Córdoba —extendiéndose luego a todo el país y América Latina— la rebelión estudiantil conocida como la Reforma Universitaria, con el fin de democratizar la universidad. La primera guerra mundial afectó económicamente a Argentina, por las restricciones del mercado mundial. Sin embargo, se destaca la industria textil y la petrolera con la creación de YPF (Yacimientos Petrolíferos Fiscales). Durante este período se privilegió a algunos sectores marginados de la población, ignorados durante los Gobiernos Conservadores.
  
  El gobierno de Marcelo T. de Alvear (1922-1928)
  Artículo principal: Gobierno de Marcelo T. de Alvear
  
  Marcelo T. de Alvear
  Las elecciones presidenciales se realizaron el 2 de abril de 1922. La Unión Cívica Radical obtuvo 450 000 votos; la Concentración Nacional (conservadores) obtuvo 200 000 votos; el Partido Socialista obtuvo 75 000 votos; y el Partido Demócrata Progresista obtuvo 75 000 votos.
  
  Marcelo Torcuato de Alvear, un hombre de la clase económica alta, desarrolló una presidencia diferente, en estilos, a la del también radical Hipólito Yrigoyen.
  
  Las políticas de transformación económica, políticas y social que había delineado el gobierno de Yrigoyen, resultaron atenuadas, cuando no directamente revertidas, como en el caso de la Reforma Universitaria o cuando el presidente Alvear vetó el proyecto de ley que extendía la jubilación a amplios sectores de trabajadores que lo enfrentó con el movimiento sindical. Ello no impidió sin embargo que fuera el gobierno de Alvear el que enviara al Congreso el proyecto de ley de nacionalización del petróleo, aunque el mismo nunca sería aprobado.
  
  Estas diferencias llevaron a un enfrentamiento entre Alvear e Yrigoyen, en el marco de una profunda división interna de la UCR entre personalistas yrigoyenistas y antipersonalistas según apoyaran o enfrentaran a Hipólito Yrigoyen. Cada uno de los dos sectores radicales presentarían candidatos distintos para presidente. Los radicales antipersonalistas, organizados en la Unión Cívica Radical Antipersonalista presentaron como candidato a presidente a Leopoldo Melo (acompañado por Vicente Gallo) y los radicales yrigoyenistas presentaron a Hipólito Yrigoyen (acompañado por Francisco Beiró).
  
  El 1 de abril de 1928 se realizaron las elecciones. El resultado fue:94
  
  Unión Cívica Radical (Yrigoyen): 838 583 votos
  Unión Cívica Radical Antipersonalista (Melo): 410 026 votos
  Partido Socialista (Justo): 64 985 votos
  Partido Demócrata Progresista: 14 173 votos
  Partido Comunista Argentino: 7658 votos
  Partido Comunista de la República Argentina (penelonistas): 5475 votos
  El triunfo fue tan amplio que los radicales yrigoyenistas lo denominaron «el plebiscito».95
  
  El segundo gobierno de Hipólito Yrigoyen (1928-1930)
  Artículo principal: Segundo gobierno de Yrigoyen
  La asunción del nuevo gobierno se produjo el 12 de octubre de 1928. En 1929 se produce la Gran Depresión mundial. El radicalismo con Yrigoyen no supo responder a la crisis. El historiador radical Félix Luna dice de ese momento:
  
  «La quiebra del ímpetu liberador del gobierno radical se debió fundamentalmente a la quiebra del radicalismo mismo».
  La división y el enfrentamiento entre sectores internos del radicalismo generaría un nivel de violencia política muy grande.
  
  Yrigoyen ordenó intervenir las provincias de Mendoza y San Juan, gobernadas por movimientos radicales disidentes como el lencinismo en la primera y el bloquismo en la segunda. En ese marco un «matón» yrigoyenista asesinó al senador mendocino Carlos Washington Lencinas. El crimen causó estupor en el país. Al mes, hubo un atentado anarquista contra Yrigoyen al salir de su casa para ir a la Casa de Gobierno. El año 1930 se inició con otro asesinato de un opositor en una provincia intervenida por el gobierno, el del abogado bloquista Manuel Ignacio Castellano. Comenzó a ser habitual en la oposición, de estudiantes, políticos, militares, civiles, y amplios sectores del periodismo, criticar al presidente por su supuesta ineficacia y autoritarismo.
  
  El 2 de marzo se realizaron elecciones parlamentarias, perdiendo el radicalismo estrepitosamente en la Ciudad de Buenos Aires, donde el Partido Socialista Independiente obtuvo 100 000 votos, seguidos del Partido Socialista con 84 000, superando por mil votos a los radicales. En todo el país, la oposición alcanzó 695 000 votos, superando al gobierno que obtuvo 655 000 votos.96`,
  `La Crisis Mundial de 1929 afectó fuertemente a la economía del país, porque su modelo agroexportador dependía de la venta de materias primas a mercados que se cerraron. El radicalismo estaba completamente dividido y no tenía diálogo con la oposición, muy crítica con el Gobierno.

  El hecho más importante y duradero del segundo gobierno de Yrigoyen fue la decisión tomada el 1 de agosto por parte de YPF, dirigida por el general Enrique Mosconi, de intervenir en el mercado petrolero, para fijar el precio y romper los trusts. El golpe de Estado sucederá apenas 37 días después, lo que ha llevado a varios historiadores a vincular, al menos parcialmente, el golpe militar con la decisión de YPF.
  
  El 6 de septiembre de 1930 el general José Félix Uriburu derrocó al gobierno constitucional, iniciando una serie de golpes de Estado en Argentina y gobiernos militares que se extenderían hasta 1983, interrumpiendo todas las experiencias de gobierno surgidas del voto popular.
  
  Bibliografía
  
  del Mazo, Gabriel (1984). La segunda presidencia de Yrigoyen. Buenos Aires: CEAL. ISBN 950-25-0051-2.
  Luna, Félix (1964). Yrigoyen. Buenos Aires: Desarrollo.
  Acciones en pos de la defensa de la soberanía argentina en el sector antártico
  En la década de los 1920 se destacó el accionar investigador y concientizador en Argentina de los derechos en el sector antártico del ingeniero civil José Manuel Moneta que intervino en las expediciones a las islas Orcadas del Sur de 1923, 1925. 1927 y 1929, dejando testimonio de ello en el libro Cuatro años en las Orcadas del Sur y, como diplomático, desempeñó en nombre del gobierno argentino varias funciones vinculadas a la Antártida.
  
  Fue en la primera mitad del siglo xx quien mediante publicaciones impresas y filmes quizás más tempranamente difundió entre la población la conciencia de una soberanía argentina en la Antártida.
  
  El 30 de marzo de 1927 fue inaugurada en las Orcadas del Sur la primera estación radiotelegráfica de la Antártida.
  
  El 15 de diciembre de 1927 la Dirección General de Correos y Telégrafos de la República Argentina comunicó a la Oficina Internacional de la Unión Postal Universal que:
  (…) la jurisdicción territorial argentina se extiende, de derecho y de hecho, a la superficie continental, al mar territorial, a las islas situadas sobre la costa marítima, a una parte de Tierra del Fuego y a los Archipiélagos de los Estados, Año Nuevo, Georgia del Sur, Órcadas del Sur y a las tierras polares no delimitadas. De derecho, no pudiendo ejercerla de hecho debido a la ocupación mantenida por Gran Bretaña, le corresponde también el archipiélago de las Malvinas.
  Artículo principal: Antártida Argentina
  Véase también: Campañas antárticas argentinas
  La «Década Infame» (1930-1943)
  
  Los cuatro presidentes del período: Uriburu, Justo, Ortiz y Castillo.
  Artículo principal: Década Infame
  Artículo principal: Concordancia (Argentina)
  Véase también: Golpe de Estado en Argentina de 1930
  La llamada Década Infame se inició con el golpe militar del 6 de septiembre de 1930 liderado por el general corporativista nacionalista católico José Félix Uriburu que derrocó al presidente Hipólito Yrigoyen de la Unión Cívica Radical, quien había sido elegido democráticamente para ejercer su segundo mandato en 1928. El gobierno proscribió a la Unión Cívica Radical y organizó una «salida electoral» fraudulenta y controlada por las Fuerzas Armadas que dio origen a una serie de gobiernos conservadores fraudulentos y corruptos, dirigidos por la Concordancia, nombre que tomó la alianza política formada entre el Partido Demócrata Nacional (también conocido simplemente como Partido Conservador), la Unión Cívica Radical Antipersonalista y el Partido Socialista Independiente que gobernó el país hasta 1943. Este período se caracterizó por el comienzo del nuevo modelo económico conocido como industrialización por sustitución de importaciones.
  
  Contexto en el cual se produce el golpe del 6 de septiembre de 1930
  Poco antes de finalizar la Primera Guerra Mundial se produjo en Europa la Revolución rusa que estableció la Unión Soviética, organizada bajo principios comunistas. El movimiento socialista se dividió cuando los líderes de los partidos socialdemócratas apoyaron la guerra, mientras que los partidarios de la Revolución rusa de 1917 formaron partidos comunistas en la mayoría de los países industrializados (y en muchos no industrializados).
  
  Tras la Primera Guerra Mundial se firmó el Tratado de Versalles, creando la Organización Internacional del Trabajo integrada por gobiernos, sindicatos y organizaciones patronales, e imponiendo severas cargas económicas a Alemania que desencadenaron una gran crisis económica y humanitaria en ese país. Entre las consecuencias políticas se produjo el Levantamiento Espartaquista en enero de 1919 y en Baviera, los comunistas derrocaron el gobierno y establecieron la República Soviética de Baviera, que duró unas pocas semanas en 1919. Una vida de brevedad similar tuvieron las Repúblicas Soviéticas que surgieron en otros estados alemanes y el gobierno soviético establecido en Hungría por Béla Kun en 1919.
  
  Durante el gobierno radical el sindicalismo y las negociaciones colectivas entre empresas y sindicatos, tuvieron una gran expansión. La Federación Obrera Regional Argentina del IX Congreso aumentó los sindicatos afiliados de 51 en 1915 a 350 en 1918. La FORA anarquista por su parte adoptó una postura crítica hacia el gobierno radical, promoviendo escenarios insurreccionales. El radicalismo estableció inicialmente una sólida vinculación con la corriente sindicalista revolucionaria, en especial con la Federación Obrera Marítima (FOM) y la Federación Obrera Ferroviaria (FOF), que se diluyó luego de las grandes masacres obreras de 1919-1922.
  
  
  Banda de la organización paramilitar fascista Liga Patriótica Argentina con apoyo policial participando en los asesinatos y pogroms de la Semana Trágica de 1919.
  En 1919 se crean en Argentina varias organizaciones paramilitares de derecha, con amplio apoyo empresario y de la embajada de Gran Bretaña, entre las que se destacó la Liga Patriótica presidida por el dirigente radical Manuel Carlés y el almirante Manuel Domecq García, ministro de Marina del gobierno de Marcelo T. de Alvear. Las organizaciones paramilitares se fortalecerían a lo largo de la década, desfilando junto a las Fuerzas Armadas y participando de las masacres obreras y el pogrom en la Semana Trágica (1919), la Patagonia rebelde (1921/22) y las huelgas forestales en Santa Fe (1921). En 1925 el radical Manuel Carlés será uno de los primeros líderes fascistas en Argentina. Tendrán un papel muy activo en el golpe de 1930 y en la represión clandestina posterior.
  
  
  Huelguistas detenidos en Tres Cerros durante la Patagonia Trágica entre 1920 y 1921.
  A mediados de la década de 1920 aparecieron en Italia y Alemania los movimientos fascista y nazi respectivamente, que tuvieron una importante adhesión en Argentina, sobre todo en las fuerzas armadas y en los sectores de derecha y en la amplia comunidad ítaloargentina que para entonces era mayoritaria en el país. En 1922 Benito Mussolini toma el poder en Italia. El jefe del fascismo en Argentina, Vittorio Valdani, llegó a ser nombrado por el presidente Marcelo T. de Alvear como Director Administrativo de la empresa estatal YPF.
  
  
  El político monárquico español Francisco Cambó fue el presidente de la CHADE, bajo cuya gestión fueron sobornados los presidentes Alvear y Justo.
  A partir de la Primera Guerra Mundial se fortalecieron las estructuras monopólicas de la economía argentina, a favor de grandes trusts internacionales y en perjuicio de la competitividad, la innovación y los consumidores argentinos, causando deformaciones estructurales que se extenderán por décadas. En algunos casos el poder de las grandes empresas privadas impuso un esquema de corrupción política sistemática, como quedó paradigmáticamente al descubierto con el escándalo de la empresa eléctrica CHADE, de origen belga y presidida por el político español Francisco Cambó, que llegó a sobornar a los presidentes radical Marcelo T. de Alvear y conservador Agustín P. Justo.
  
  La crisis económica mundial de 1929 llamada Gran Depresión tuvo un profundo impacto en la Argentina. Afectó primero económicamente ya que el 80 % de los ingresos fiscales en Argentina provenían del comercio exterior. La crisis creó una situación de tensión social, con bajas de sueldo, aumento del desempleo; es decir, una contracción de la economía. Y esto generó también, en el plano político, un contexto en el cual se produce el golpe de 1930. La crisis de 1929 fue un factor que creó una situación de tensión, de malestar sobre la economía, en términos sociales y de preocupación e incertidumbre en los sectores económicos dominantes y esto contribuyó a crear este clima. En América Latina en general hubo una crisis de sistemas democráticos prácticamente en toda la región.
  
  
  El uruguayo Natalio Félix Botana formó parte del grupo golpista y utilizó el popular Crítica que había fundado para desprestigiar al presidente Yrigoyen.
  Por otra parte, la enseñanzas sociales de la Iglesia católica de la época estaban basadas en la encíclica Rerum Novarum de 1891 que versaba sobre las condiciones de las clases trabajadoras, dejaba patente su apoyo al derecho laboral de «formar uniones o sindicatos», reafirmaba en su apoyo al derecho de la propiedad privada y discutía sobre las relaciones entre el gobierno, las empresas, los trabajadores y la Iglesia, proponiendo una organización socioeconómica que más tarde se llamaría corporativismo. Recién a partir de 1931 el papa Pío XI condenó al fascismo y propuso llevar a la práctica los principios de la recta razón y de la filosofía socialcristiana.
  
  Las posturas nacionalistas surgidas por imitación de lo ocurrido en Italia con Benito Mussolini que apoyaban la implantación de un corporativismo provocaron la división del Partido Popular y su disolución. Fue entonces cuando los nacionalistas católicos apoyaron al semanario "La Nueva República", opositor al gobierno radical de Hipólito Yrigoyen que, en plena Gran Depresión mundial de 1929 fue muy criticado por una serie de intervenciones a provincias por decreto y asesinatos de opositores, entre ellos el del senador Lencinas,103 que produjeron el debilitamiento de la democracia104 y desencadenaron el golpe militar dirigido por el general José Félix Uriburu.
  
  Una vez que Hipólito Yrigoyen fue elegido presidente en 1916, comenzó a formarse dentro de la Unión Cívica Radical un amplio sector que se opuso a Yrigoyen, considerándolo autoritario. Este sector se autodenominó "antipersonalista" y llegó a formar otro partido radical denominado Unión Cívica Radical Antipersonalista con el que se presentó a las elecciones presidenciales de 1928 con la fórmula Leopoldo Melo-Vicente Gallo, saliendo segundo detrás del mismo Hipólito Yrigoyen. Derrotados en las urnas, los radicales antipersonalistas comenzaron a conspirar contra el gobierno constitucional y luego integrarían la Concordancia, que gobernó fraudulentamente entre 1932 y 1943.
  
  Los grupos conservadores y los medios de comunicación gráfica, también conspiraron contra el gobierno constitucional desde que fue elegido el primer presidente por voto secreto y obligatorio en 1916. El diario roquista La Prensa le había advertido a Yrigoyen en una editorial antes de asumir, que si se empeñaba en llevar adelante una política no conservadora "será batido y desalojado del poder".105 Otro factor determinante del golpe de Estado contra Yrigoyen fue el diario Crítica del uruguayo Natalio Félix Botana, que "no sólo contribuyó al derrocamiento del gobierno con acerbas críticas de su diario, sino con su participación personal en la trama que, con la conducción en la sombra del jefe del ejército Agustín Justo, culminó el 6 de septiembre de 1930".98106
  
  La dictadura militar de Uriburu (1930-1932)
  Artículo principal: José Félix Uriburu
  El 6 de septiembre de 1930, Uriburu encabezó un golpe de Estado que derrocó al gobierno constitucional Hipólito Yrigoyen y estableció una dictadura militar, la primera de una serie que se extendería hasta 1983.
  
  El 10 de septiembre, José Félix Uriburu fue reconocido como presidente de facto de la Nación por la Corte Suprema mediante la acordada que dio origen a la doctrina de los gobiernos de facto y que sería utilizada para legitimar a todos los demás golpes militares.107
  
  Uriburu básicamente representó en aquel momento ante todo un nacionalismo católico corporativista. Inclusive el proyecto de constitución neocorporativa que tenía Uriburu y sus sectores era un sistema neocorporativo mixto. Querían que hubiera una cámara corporativa, por ejemplo, con representación de sindicatos, empresarios y otra cámara con representación política. Eran proyectos neocorporativos. Ideológicamente muy tributarios del nacionalismo católico, que desde los años '20 venía creciendo en Argentina.102
  
  Uriburu le encomendó al poeta Leopoldo Lugones la redacción de la proclama revolucionaria, pero la primera versión fue acusada de fascista por parte del coronel José María Sarobe y el general Agustín P. Justo, que representaban el liberalismo conservador tradicional de la Argentina102
  
  Los discursos mencionaban continuamente la necesidad de restaurar el orden, la propiedad y las jerarquías.108 Sin embargo, a diferencia de los fascismos europeos, la derecha argentina consideraba que la clave del sistema político propuesto era el Ejército, y no organizaciones paramilitares.109
  
  Uriburu propuso la fundación de un Partido Nacional, al que deberían adherirse los demás partidos, aunque estaban excluidos el radicalismo yrigoyenista y posiblemente el Partido Socialista. La invitación fue rechazada por todos, salvo algunos grupos conservadores. Uriburu se había adelantado a convocar a elecciones para gobernador de Buenos Aires, confiando en presentar una candidatura única del Partido Nacional frente a los radicales; cuando su proyecto fracasó, no pudo retractarse.110
  
  En el mes de abril, de 1931 se celebraron las elecciones bonaerenses, con un resultado imprevisto: pese a que el gobierno consideraba al radicalismo completamente "fuera de la historia", y a que este no organizó una campaña electoral ni tenía apoyo de la prensa, el candidato radical Honorio Pueyrredón obtuvo el triunfo. Pese a que en el Colegio Electoral el radicalismo quedó varios votos por detrás y debía negociar con los socialistas para alzarse con la gobernación, el gobierno entró en pánico y la mayoría de los ministros presentó la renuncia. Uriburu reorganizó el gabinete, nombrando ministros del sector "liberal". El 8 de mayo suspendió el llamado al colegio electoral provincial, y nombró gobernador de facto de la provincia de Buenos Aires a Manuel Ramón Alvarado.111
  
  Pocas semanas más tarde estalló una revolución en la provincia de Corrientes, dirigida por el teniente coronel Gregorio Pomar; aunque fue rápidamente reprimida, dio a Uriburu la excusa que buscaba: clausuró todos los locales de la UCR, arrestó a docenas de dirigentes y prohibió a los colegios electorales elegir políticos vinculados directa o indirectamente con Yrigoyen; Pueyrredón había sido ministro de Yrigoyen, lo que significaba que no podía ser elegido, pero además fue expulsado del país junto con Alvear. Además suspendió las elecciones de gobernadores planeadas para las provincias de Córdoba y Santa Fe.112 En el mes de septiembre llamó a elecciones para el mes de noviembre, y poco después anuló las elecciones en Buenos Aires.113
  
  El experimento corporativista había fracasado, pero aun así, el 20 de febrero de 1932, horas antes de entregar el gobierno a su sucesor, Uriburu declararía que "el voto secreto es precisamente lo que ha permitido el desenfreno demagógico que hemos padecido."114
  
  Presidencia de Agustín P. Justo (1932-1938)
  Artículo principal: Agustín P. Justo
  Luego del fracaso del ensayo corporativista nacionalista católico de José Félix Uriburu gobernó la Argentina una alianza política conservadora que se denominó la «Concordancia» que fue una alianza política formada entre el Partido Demócrata Nacional (también conocido simplemente como Partido Conservador), la Unión Cívica Radical Antipersonalista y el Partido Socialista Independiente que gobernó el país durante la llamada década infame entre 1932 y 1943, a través de los presidentes Agustín P. Justo (1932-1938), Roberto M. Ortiz (1938-1940) y Ramón Castillo que debió completar el período por muerte del presidente Ortiz (1940-1943).
  
  Este período se caracterizó por el comienzo del nuevo modelo económico conocido como industrialización por sustitución de importaciones.
  
  En el plano económico, con la crisis de la bolsa, los mercados internacionales tienden a cerrar sus economías adoptando modelos de proteccionismo. Inglaterra anuncia en la "convención de Ottawa" que les dará ventajas arancelarias a sus colonias. Debido a su gran dependencia, el país firma el pacto Roca-Runciman con Inglaterra en 1933, cediendo así el sector ferroviario y otras áreas estratégicas a cambio de un trato privilegiado para las carnes argentinas. El pacto fue cuestionado por opositores e historiadores,* 1 considerando que afectaba gravemente la soberanía nacional y citando la declaración pública del vicepresidente de la Nación mientras negociaba el tratado, en la que afirmó que "desde el punto de vista económico, (Argentina es) una parte integrante del Imperio Británico".115
  
  Ante esta crisis del modelo agroexportador argentino, a mediados de la década se inició un proceso de industrialización por sustitución de importaciones, con su eje principal en Buenos Aires, acompañado de una ola migratoria interna, del campo a las ciudades y del interior a la capital.
  
  En este período la Unión Cívica Radical, conducida por Marcelo Torcuato de Alvear, será sistemáticamente excluida del acceso al gobierno mediante el uso abierto del fraude electoral y la represión. En el seno del radicalismo aparecieron fuertes corrientes nacionalistas yrigoyenistas que se expresaron en la fundación del influyente grupo FORJA, y en los primeros núcleos de la intransigencia radical, que conducirá en la UCR en la década siguiente y que por entonces comenzaba a nuclearse alrededor de Amadeo Sabattini, gobernador de Córdoba (1936-1940).
  
  Por su parte el Partido Socialista y sobre todo su aliado el Partido Demócrata Progresista, conducido por Lisandro de la Torre, denunciarán en el Congreso los sucesivos actos de corrupción en beneficio de una élite realizados por el régimen, que incluso causarán el asesinato del senador Enzo Bordabehere en el recinto del Senado.
  
  Finalmente, en ese período, el movimiento obrero argentino se organizó en la Confederación General del Trabajo (CGT), sobre el sindicato de actividad y nuevas ideas nacionalistas y de relaciones con los partidos políticos populares.
  
  Presidencia de Roberto Ortiz (1938-1942)
  Hacia 1939 cuando comenzó la Segunda Guerra Mundial, Argentina estaba gobernada por el presidente radical antipersonalista Roberto Ortiz, que había sido ministro del presidente radical (UCR) Marcelo T. de Alvear. Durante su gobierno Argentina influyó decisivamente en la paz alcanzada entre Paraguay y Bolivia que se habían enfrentado en la Guerra del Chaco. La tradicional política neutralista y de no beligerancia se mantendría hasta 1944.
  
  Presidencia de Ramón Castillo (1942-1943)
  En 1942, debido a la enfermedad del presidente Ortiz, asumió el vicepresidente Ramón Castillo, hasta 1943, en que sería derrocado. Su presidencia estuvo marcada por las presiones de Estados Unidos para que Argentina abandonara su tradicional posición neutralista y le declarara la guerra a las potencias del Eje,116 cosa que efectivamente iba a suceder durante la presidencia de Edelmiro Farrell (27 de marzo de 1945).
  
  Reclamaciones antárticas y toma de posesión formal del territorio continental antártico
  En 1939 la Argentina crea transitoriamente para asistir a una invitación noruega a la Comisión Nacional del Antártico mediante el decreto N.º 35821, pero por el decreto N.º 61852 del 30 de abril de 1940 pasó a ser un organismo permanente con el objeto de intensificar las investigaciones en la zona. Se realizaron exploraciones, tareas científicas, relevamiento de terreno y balizamiento.
  
  El 6 de noviembre de 1940 Chile estableció por decreto los límites de sus reclamaciones antárticas.
  Forman la Antártica Chilena o Territorio Chileno Antártico, todas las tierras, islas, islotes, arrecifes, glaciares y demás conocidos y por conocer, y el mar territorial respectivo, existentes dentro de los límites del casquete constituido por los meridianos 53°, longitud oeste de Greenwich, y 90°, longitud oeste de Greenwich.
  La Argentina protestó formalmente por el decreto chileno mediante nota del 12 de noviembre de 1940, rechazando su validez y expresando una potencial reclamación a la misma área.117 A su vez, el Reino Unido protestó el 25 de febrero de 1941.
  
  En octubre de 1941 el Instituto Geográfico Militar argentino publicó mapas que mostraban la extensión de la futura reclamación argentina entre los 25° O y 75° O.
  
  En enero de 1942 la Argentina, de acuerdo con la teoría de los sectores polares, declaró sus derechos antárticos entre los meridianos 25° y 68° 24' Oeste (el de punta Dungeness). Lo que dio lugar a un memorándum de respuesta del Gobierno chileno del 3 de marzo de 1942, reservando sus derechos.
  
  La Argentina realizó en la isla Decepción su toma de posesión formal del territorio continental antártico el 8 de noviembre de 1942, mediante la colocación de un cilindro que contenía un acta y una bandera dejados allí por una expedición al mando del capitán de fragata Alberto J. Oddera. En enero de 1943 personal del barco británico HMS Carnarvon Castle destruyó las evidencias de la toma de posesión argentina, plantó la bandera británica y envió a Buenos Aires el acta. El 5 de marzo de ese año el buque argentino ARA 1° de Mayo removió la bandera británica.118
  
  Artículo principal: Antártida Argentina
  Véase también: Campañas antárticas argentinas
  El peronismo (1943-1955)
  Antecedentes: la Revolución del 4 de junio de 1943 (1943-1946)
  Artículo principal: Revolución del 43
  
  Arturo Rawson, Pedro Pablo Ramírez y Edelmiro Farrell, los tres generales presidentes de la Revolución del 43
  El 4 de junio de 1943 se produjo un nuevo golpe militar encabezado por los generales Arturo Rawson y Pedro Pablo Ramírez y apoyado por varios sectores militares entre los que se destacaba una agrupación de militares del Ejército denominado GOU (Grupo de Oficiales Unidos), integrado por unos veinte oficiales mayoritariamente jóvenes de ideologías diversas que compartían un enfoque nacionalista. El golpe derrocó al presidente Ramón Castillo quien fue reemplazado por el general Arturo Rawson, quien tres días después fue reemplazado a su vez por el general Pedro Pablo Ramírez.
  
  La Revolución del 43 contenía en su interior diversos sectores que lucharon entre sí para controlar la dirección del proceso. Uno de esos sectores estuvo liderado por el entonces coronel Juan Domingo Perón, quien ocupó inicialmente un cargo de menor significación como secretario del Ministerio de Guerra, en cabeza del general Edelmiro Farrell. A partir de la segunda mitad de 1943 comenzó una política de alianza con el movimiento sindical que le permitiría ir ocupando posiciones cada vez más influyentes en el gobierno militar. En ese camino resultó fundamental su designación a cargo del irrelevante Departamento de Trabajo, elevado luego al nivel de Secretaría de Estado.
  
  A comienzos de 1944 el gobierno militar rompió relaciones diplomáticas con los países del Eje, decisión que llevó a un enfrentamiento entre sus sectores internos y a exigir la renuncia del presidente Ramírez, quien fue reemplazado por el general Edelmiro Farrell, pasando Perón a ocupar el Ministerio de Guerra que dejó aquel. Farrell se apoyó en Perón y su exitosa política laboral-sindical y sufrió el embate del sector nacionalista de derecha liderado por el ministro del Interior, el general Luis César Perlinger. En la segunda mitad del año el dúo Farrell-Perón consolidó su posición, desplazando al sector de la derecha nacionalista católica-hispanista, y profundizó las reformas laborales generalizando la negociación colectiva, sancionando el Estatuto del Peón de Campo que laboralizó la situación de los trabajadores rurales, creando los tribunales de trabajo y estableciendo la jubilación para los empleados de comercio. También se tomaron importantes medidas industrialistas como la creación del Banco Industrial de Crédito.
  
  A partir del segundo semestre de 1943 se estableció en el gobierno un grupo integrado principalmente por sindicatos socialistas y sindicalistas revolucionarios liderado por el coronel Juan Domingo Perón, que logró ocupar primero el pequeño Departamento de Trabajo, para irse fortaleciendo progresivamente, mediante una acción encaminada a defender los derechos de los trabajadores y promover el protagonismo sindical. Las principales medidas laborales fueron:
  
  El Estatuto del Peón, que estableció un salario mínimo y procuró mejorar las condiciones de alimentación, vivienda y trabajo de los trabajadores rurales.
  El establecimiento del seguro social y la jubilación que benefició a 2 millones de personas.
  La creación de Tribunales de Trabajo, cuyas sentencias, en líneas generales, resultaron favorables a las demandas obreras.
  La fijación de mejoras salariales y el establecimiento del aguinaldo para todos los trabajadores.
  El reconocimiento de las asociaciones profesionales, con lo cual el sindicalismo obtuvo una mejora sustancial de su posición en el plano jurídico.
  En 1945 el embajador de los Estados Unidos Spruille Braden organizó un fuerte movimiento que se identificó como antiperonista [¿por quién?], que produjo a su vez que amplios sectores sindicales, hasta entonces socialistas y sindicalistas revolucionarios -y en menor medida anarquistas y comunistas-, se identificaran como peronistas. El enfrentamiento entre ambos grupos derivó en un golpe de Estado [cita requerida] antiperonista el 9 de octubre de 1945, desplazando a los sindicalistas del gobierno y deteniendo a Perón. Como respuesta, el 17 de octubre de 1945 se produjo una gran movilización de obreros y sindicalistas en la Plaza de Mayo, que exigieron y obtuvieron la liberación de Perón y el compromiso de la dictadura de llamar a elecciones.
  
  A partir de entonces ambos bandos se prepararon para enfrentarse en elecciones el 24 de febrero de 1946 triunfando Juan Perón y como vicepresidente el radical Hortensio Quijano -candidatos de los partidos Laborista, Unión Cívica Radical Junta Renovadora e Independiente-, contra la fórmula de la Unión Democrática integrada por los radicales José P. Tamborini-Enrique Mosca.
  
  El primer gobierno de Juan D. Perón (1946-1952)
  
  Juan Domingo Perón: el mayor líder popular de la historia argentina.
  Artículo principal: Primer gobierno de Perón
  En las elecciones de 1946 Perón se presentó como candidato de tres partidos aliados: el Partido Laborista, organizado por los sindicatos, la Unión Cívica Radical Junta Renovadora y el Partido Independiente, de tendencia conservadora. Su vicepresidente fue Hortensio Quijano, un radical de la disidente Unión Cívica Radical Junta Renovadora. Las elecciones polarizaron al país: por un lado el peronismo, los sindicalistas de la CGT y grupos yrigoyenistas del radicalismo, UCR Junta Renovadora o FORJA (Donde se encontraban reconocidas personalidades como Arturo Jauretche, Raúl Scalabrini Ortiz, etc.), y de los conservadores de las provincias del interior y por el otro la Unión Democrática que contaba con la participación de la UCR y los partidos Socialista y Demócrata Progresista y el apoyo del Partido Comunista, los conservadores de la provincia de Buenos Aires y el embajador de los Estados Unidos, Spruille Braden. En las elecciones triunfó Perón, con el 52 % de los votos.
  
  Tras asumir la presidencia se fusionaron los partidos que llevaron la candidatura de Perón, formando el Partido Peronista —llamado brevemente Partido Único de la Revolución, y hoy conocido como Partido Justicialista— y luego de obtenido el sufragio femenino, en 1949 Eva Perón organizó el Partido Peronista Femenino. Se estableció un criterio de cupos por el cual los cargos políticos se repartían en partes iguales entre los sindicatos, el sector político del Partido Peronista y las mujeres.
  
  En 1947 la Cámara de Diputados inició un juicio político contra los miembros de la Corte Suprema que habían legitimado los golpes de estado de 1930 y 1943, resultando removidos de sus cargos.
  
  En 1949 se convocó elecciones para la Asamblea Constituyente que dictó una nueva Constitución acorde con los principios del constitucionalismo social y el peronismo, estableciendo, entre otras cosas la igualdad jurídica de hombres y mujeres, los derechos de los trabajadores, los derechos de la ancianidad, la autonomía universitaria, la función social de la propiedad y las facultades de intervención del Estado en la economía, así como la reelección presidencial inmediata, que Perón aprovechó en 1951. Según opositores, esta reelección sucesiva, previamente prohibida por el artículo 77, fue la principal intención de la reforma constitucional.119
  
  El primer gobierno peronista amplió los derechos laborales y sociales, de las mujeres, de las personas que vivían en los territorios nacionales, de los ancianos, de los niños, de los sectores vulnerables y promovió la industrialización del país. En materia laboral se creó el Ministerio de Trabajo y Previsión Social y por primera vez en la historia argentina la retribución del trabajo superó a la retribución del capital.120 Con respecto a los derechos de las mujeres, se sancionó la ley del voto femenino en 1947. Con respecto a los territorios cuyos habitantes tenían sus derechos políticos restringidos, en 1951 el Congreso Nacional aprobó la ley 14307 provincializando los territorios nacionales del Chaco y La Pampa que por decisión de las convenciones constituyentes elegidas por los pueblos de esas provincias adoptaron los nombres de Provincia Presidente Perón y Provincia Eva Perón, respectivamente. En materia de seguridad social ("previsión social") se masificó la cobertura, pasando de 397 000 afiliados en 1939 a 2 327 946 en 1949,121 a la vez que Eva Perón realizó una amplia obra asistencia social a los sectores más vulnerables, desde la Fundación Eva Perón cuyos fondos provenían de aportes de distinta índole: estaban los obligatorios impuestos por leyes nacionales sobre los jornales de los obreros argentinos dos veces al año y las donaciones de empresas privadas, aparentemente voluntarias pero constituyendo en la práctica casi un requisito para funcionar sin problemas con el gobierno peronista.122123 También recibía fondos del Estado y utilizaba inmuebles, personal y medios de transporte del mismo. Un decreto del Poder Ejecutivo dispuso que los sobrantes de las partidas de cada ministerio se transfiriera a la Fundación y pese a que fue objetado por el Tribunal de Cuentas igual fue aplicado.124En materia de salud se creó el Ministerio de Salud Pública a cargo de Ramón Carrillo, desde la cual se realizaron campañas para eliminar el paludismo, la fiebre amarilla y las enfermedades venéreas, programas de vacunación masiva (antivariólica y antidiftérica), producción nacional de medicamentos y reducción de su costo y construcción de hospitales.125 En materia económica se nacionalizaron sectores básicos como los ferrocarriles, el servicio telefónico, las líneas aéreas, el comercio exterior, la flota mercante, el sector siderúrgico pesado y se impulsó la industrialización. En política internacional el ministro Juan Atilio Bramuglia, de extracción sindical, implementó una política de neutralidad en la Guerra Fría que denominó "la tercera posición" y una política de alianzas regional con Bolivia, Brasil, Paraguay y Chile.126 En educación se promovió la educación técnica, se creó la Universidad Obrera Nacional (luego renombrada Universidad Tecnológica Nacional) y se estableció la gratuidad de la enseñanza universitaria.127128
  
  Tras 15 años de democracias restringidas e intervenciones militares sobre los gobiernos civiles, en 1946 el Congreso sancionó una nueva Ley de Educación Superior que puso a las universidades bajo la órbita de las reglas de una democracia sin proscripción. Para eso, y marcando un hito en la historia de la legislación sobre educación superior, el peronismo dictó en 1947 la Ley N.º 13 031, denominada Ley Guardo, en honor al diputado justicialista creador de su articulado. Esta legislación puso punto final a la larga vigencia de los cuatro artículos de la reducida Ley N.º 1597 de 1885, «Ley Avellaneda», que ofició de marco legal hasta entonces.
  
  En 1949, con la intención de atender a algunos planteos de los universitarios, incorporar avances de la ley sancionada en 1947 y sentar las bases para una nueva ley, se incorporó un artículo en la Constitución Nacional de 1949. En 1954 se sancionó una nueva ley, la 14 297. En ella se incorporaron algunos otros postulados de la Reforma Universitaria, como la definición de la extensión y la participación directa de los estudiantes. Esta ley profundizó la participación estudiantil en el gobierno de las facultades, otorgándoles el derecho al voto.129
  
  Polarización entre peronistas y antiperonistas
  Los dos primeros gobiernos peronistas estuvieron marcados por la extrema polarización de la sociedad entre antiperonistas y peronistas, así como por la acción de sectores no peronistas ni antiperonistas, apoyando a uno u otro bando o a ninguno. Andrés Avellaneda y Alejandra Giuliani hablan de la historiografía antiperonista que se hizo dominante a partir de la dictadura antiperonista de 1955,130 señalando sus mitos,131 y su interpretación restringida de los hechos al desconocer la autonomía de los diversos grupos que integraron la alianza peronista.130 En el mismo sentido se orientan las investigaciones del historiador israelí Raanan Rein, poniendo el acento en el estudio de las características especiales de los dirigentes de segunda línea del peronismo y las particularidades regionales.132 En 2003 el dirigente peronista Antonio Cafiero reprochó la interpretación de los hechos que hacía uno de los principales historiador antiperonistas, Hugo Gambini, por no tener en cuenta el contexto histórico en el que sucedieron esos hechos.133
  
  El gobierno peronista y la justicia detuvieron dirigentes de la oposición acusándolos de cometer delitos, participar en actos terroristas e intentos de golpes de Estado. Ricardo Balbín, diputado de la Unión Cívica Radical fue desaforado por la Cámara de Diputados de la Nación y detenido por orden judicial, acusado de haber cometido el delito de desacato. El general Alejandro Agustín Lanusse fue detenido por su participación en el intento de golpe de Estado de 1951. Los dirigentes de la Unión Cívica Radical Roque Carranza y Arturo Mathov fueron detenidos por haber asesinado a siete personas y herir a más de cien en el atentado en la Plaza de Mayo del 15 de abril de 1953, siendo a su vez torturados por la Policía Federal.
  
  Hugo Gambini y Silvia Mercado señalan que el gobierno negó el acceso a la radio y televisión a los dirigentes no peronistas hasta dos meses antes de su derrocamiento.
  
  En esos años «la radio» eran una gran cantidad de emisoras privadas instaladas en la mayoría de las grandes ciudades del país, mientras que «la televisión» era un canal estatal, que inició sus transmisiones en 1951. Mirta Varela señala que "Perón llegó al gobierno toda la prensa en contra" y que durante la campaña electoral, los grandes diarios nacionales y la radio, prácticamente no otorgaron espacio a las actividades del frente peronista, difundiendo una simbología que presentaba a los peronistas como «invasores» y expresiones como "las patas en la fuente" para referirse a las personas que se refrescaban, evitando los nombres de Perón y Evita, anticipando una política de exclusión del peronismo de los medios de comunicación que establecería por ley la dictadura antiperonista después de 1955.
  
  Celso Ramón Lorenzo cuenta que los locales partidarios de la oposición eran atacados, la policía reprimía sus actos públicos y se perseguía a los militantes. El gobierno usaba la figura del "desacato contra la investidura presidencial" para procesar incluso a diputados de la oposición.
  
  El gobierno clausuró una gran cantidad de diarios opositores, sobre todo en las ciudades del interior, en algunos casos mediante la Comisión Visca, una comisión del bicameral del Congreso Nacional presidida por el diputado José Emilio Visca, un exconservador devenido peronista. Visca era secundado por el diputado también peronista Rodolfo Decker. La comisión fue creada en 1949 para investigar las denuncias de torturas aplicadas a opositores, pero que en lugar de ello se dedicó a investigar y clausurar medios de prensa que no respondieran al gobierno, con las excusas más insignificantes o esgrimiendo "razones de seguridad, higiene y moralidad" y así un baño en malas condiciones era suficiente causa... En su estudio sobre la relación de peronismo con los medios de comunicación, Mirta Varela contextualiza el conflicto poniendo de relieve la confrontación de "toda la prensa" contra el peronismo, frecuentemente con información decididamente parcial y discriminación de clase, desde la campaña electora de 1946, contextualizando el conflicto. El historiador Félix Luna cuestionó duramente la conducta de los medios de prensa en aquel momento:
  
  Desde el punto de vista de la ética periodística, la posición de la prensa independiente fue condenable. El castigo a este sectarismo llegó por sí mismo: la deformación de la realidad fue tan completa que todos, los que escribían y los que leían, llegaron a convencerse de que la imagen presentada era cierta; que la Unión Democrática representaba la arrasadora mayoría del país frente a minúsculas turbas despreciables.
  Félix Luna
  Persiguió a sindicalistas opositores, removió a los profesores disidentes de las universidades, utilizó recursos del Estado para la actividad del Partido Peronista impulsó un culto a la personalidad de Perón y Eva Perón desde los libros de lectura en la escuela primaria hasta la designación con nombres alusivos al peronismo tales como Eva Perón, Juan Domingo Perón, el ministro Juan Pistarini, 26 de julio, 8 de octubre (cumpleaños de Perón), 7 de mayo (cumpleaños de Eva Perón) y 17 de octubre (fecha de la manifestación obrera que exigió a la dictadura militar la liberación de Perón), de calles, estaciones de tren y subterráneo, ciudades y plazas[cita requerida], buques de guerra e instalaciones y unidades militares, etc., obligó a los empleados públicos a ser afiliados al Partido Peronista. impulsó a la Confederación General Universitaria (CGU) como representante de los estudiantes peronistas en oposición a la Federación Universitaria Argentina (FUA), de tendencia antiperonista.
  
  El israelí Raanan Rein cuestiona la tendencia de una parte de historiografía argentina por haber "mordido el anzuelo" de la retórica populista, aceptando como un hecho la relación directa entre Perón y sus seguidores, sin tener en cuenta la autonomía de los diferentes poderes, grupos, segundas líneas y manifestaciones regionales del movimiento.
  
  En 1951 el gobierno peronista decidió enviar al Congreso Nacional un proyecto para provincializar los territorios nacionales de La Pampa y Chaco, cuyos habitantes carecían de derecho a elegir y ser elegidos. Para constituirse como tales, las poblaciones de las nuevas provincias eligieron convenciones constituyentes, ganando la mayoría el Partido Peronista. Las constituciones provinciales siguieron los líneamientos del constitucionalismo social y de la reforma constitucional argentina de 1949, estableciendo entre otras normas los derechos de los trabajadores, de la ancianidad y la igualdad jurídica entre varones y mujeres. En dichas constituciones los convencionales dispusieron nombrar al exterritorio de La Pampa como Provincia Eva Perón y al exterritorio del Chaco como Provincia Presidente Perón.
  
  Grupos de oposición antiperonista, entre ellos sectores militares, principalmente de la Marina, de la Unión Cívica Radical, del partido conservador, de la Iglesia católica, de organizaciones de extrema derecha y del Partido Socialista, impulsaron acciones de desestabilización institucional, organizaron comandos civiles armados, organizaron el golpe de Estado en 1951, realizaron el atentado terrorista en la Plaza de Mayo del 15 de abril de 1953 matando a siete personas e hiriendo a otras cien, organizaron el bombardeo de Plaza de Mayo -uno de los participantes fue el alto dirigente radical Miguel Ángel Zavala Ortiz- asesinando a 308 personas y un número indeterminado de víctimas que no pudieron ser reconocidas y realizaron el golpe de Estado de 1955 para imponer una dictadura militar, que derogó por proclama militar la Constitución de 1949 e impuso un régimen represivo con el objetivo declarado de "desperonizar" el país, fusilando, encarcelando y persiguiendo a dirigentes políticos y sindicales peronistas, cesanteando a profesores peronistas, suspendiendo a deportistas que tuvieran ideas peronistas y estableciendo listas negras para los artistas peronistas.
  
  El intento de golpe de Estado del 28 de septiembre de 1951
  Artículo principal: Golpe de Estado del 28 de septiembre de 1951
  Véase también: Golpes de Estado en Argentina
  El 28 de septiembre de 1951 efectivos del Ejército, la Armada y la Fuerza Aérea al mando del general retirado Benjamín Menéndez intentaron derrocar al gobierno del presidente Juan Domingo Perón. En su breve proclama los rebeldes acusaban al gobierno de haber llevado la Nación a «una quiebra total de su crédito interno y externo, tanto en lo moral y espiritual como en lo material». Las restricciones a las libertades cívicas y a la acción de los opositores, la reforma constitucional que permitía la reelección del presidente, así como las medidas de politización de las fuerzas armadas parecen haber influido en los militares adherentes al movimiento.
  
  Algunos sectores descontentos de las fuerzas armadas entraron en un estado deliberativo para destituir al gobierno y buscaron un líder para encabezar la rebelión. Los que podían asumir ese papel eran los generales Eduardo Lonardi, el único militar no oficialista con mando de tropas, que estaba como comandante del Primer Cuerpo de Ejército y el general Benjamín Menéndez, retirado desde 1942, pero no pudieron acordar una acción en común, separados en palabras de Potash con las que coincide Luna- por “la dignidad personal, el orgullo y la ambición”.
  
  Viendo un momento político favorable Menéndez dio la orden de desencadenar el golpe el 28 de septiembre y Lonardi que había pedido su retiro, que le fue aceptado de inmediato- decidió no adherir al golpe pero dejó en libertad a sus seguidores, parte de los cuales apoyaron el mismo. En la madrugada de ese día Menéndez y su estado mayor entraron a Campo de Mayo, una instalación militar de gran extensión, donde ya había unidades sublevadas. Se produjo en el regimiento de tanques un tiroteo que ocasionó el único muerto, el cabo Miguel Farina que había intentado oponerse. De los treinta tanques presentes, solo pudieron movilizar a dos probablemente por sabotaje de los suboficiales- y el resto fue abandonado, por lo que en definitiva la columna golpista partió al mando del general Menéndez con dos tanques Sherman, tres unidades blindadas y 200 efectivos a caballo.
  
  No obtuvo el apoyo esperado del Colegio Militar de la Nación y el destacamento mecanizado de La Tablada que también se había rebelado se rindió sin combatir ante tropas leales al gobierno por lo que Menéndez junto con algunos de sus oficiales se entregó detenido.
  
  Por otra parte, la escuadra aeronaval y la base militar de Punta Indio, que se habían sublevado, al conocer que carecían de fuerzas terrestres desistieron de su acción y algunos de los intervinientes fueron detenidos y otros escaparon.
  
  Los militares golpistas fueron detenidos y enjuiciados. Perón y Lucero impulsaron en cambio optaron por aplicar sanciones moderadas. Menéndez fue condenado a 15 años de prisión; Rodolfo Larcher, Armando Repetto y Julio Rodolfo Alsogaray, fueron condenados seis años de reclusión; a cuatro años el capitán Alejandro Agustín Lanusse, Gustavo Martínez Zuviría, Víctor Salas y Costa Paz; fueron sancionados a tres años Manuel Raymúndez y Rómulo Menéndez y a un año Luis Prémoli, Ricardo Echeverry Boneo y Manuel Rojas Silveyra. Ninguno de ellos perdió su grado militar. Los sectores más duros del peronismo, liderados por Eva Perón, sostenían que los delitos cometidos -que incluían un homicidio-, debieron haber sido sancionados severamente, con pérdida de los grados militares y aplicación de la pena de muerte en los casos más graves. El historiador radical Félix Luna opinó que Perón aprovechó el intento del golpe para depurar las fuerzas armadas, desprendiéndose mediante su retiro de oficiales que no habían sido parte de la rebelión.
  
  El jefe de la aviación naval, capitán de navío Vicente Baroja escapó al Uruguay y desde allí declaró:
  
  Habíamos confiado en derrocar al tirano con pequeñas acciones, sin derramamiento de sangre. La lección fue que era preciso llegar al derramamiento de sangre para voltearlo.
  Capitán de navío Vicente Baroja
  El segundo gobierno de Juan D. Perón (1952-1955)
  En 1949, Perón reformó la Constitución de 1853, de manera que pudo ser reelegido en las elecciones de 1951. Por primera vez en la historia del país las mujeres ejercieron su derecho al voto. En noviembre, Perón volvió a triunfar en las elecciones por un amplio margen (62,49%).
  
  En ese año, Eva Perón intentó acceder a la nominación a la vicepresidencia de lo que sería el segundo mandato presidencial de Perón. Si bien contaba con el respaldo de la CGT,[cita requerida] la oposición militar y su estado de salud la condujeron a su célebre renunciamiento en un acto multitudinario en la avenida 9 de julio. Evita murió de un cáncer uterino a la edad de 33 años en 1952. Su cuerpo fue embalsamado y mantenido en exposición hasta que el golpe militar expulsó a su marido del poder en 1955. Clandestinamente fue enviado el cadáver a Italia y enterrada en Milán con nombre falso. En 1972 fue devuelto a su esposo. Sus restos reposan en el cementerio de La Recoleta en Buenos Aires.
  
  El peronismo contó con una amplia adhesión de los sectores populares a partir de entonces, pero a su vez produjo una profunda polarización entre los peronistas y los antiperonistas. Evita finalmente muere el 26 de julio de 1952, con tán solo 33 años de edad, luego de que Perón inicie su segundo mandato. Su funeral marcó un hito en la historia argentina: recibió los honores de un presidente en ejercicio, su cortejo fúnebre fue presenciado en las calles de Buenos Aires por casi tres millones de personas, y su funeral duró dieciséis días. El Congreso la declaró Jefa Espiritual de la Nación Argentina.
  
  `,
];

export const mockGroupedSupabaseAIDBData: SupabaseData[][] = [
  [
    {
      id: '1db71a68-452c-48b6-a6d5-92aec082747d',
      created_at: '2023-10-24T17:16:41.344703+00:00',
      updated_at: '2023-10-24T17:16:40.727+00:00',
      data: {
        id: 3,
        name: 'Headphones',
        price: 99.99,
        category: 'Electronics',
        description:
          'Noise-canceling headphones for immersive audio experience.',
      },
      data_chunk: '',
      ai_table_name: 'test1',
      tokens: 36,
      embedding: [],
      formatted_data: '',
    },
    {
      id: '415b034a-6bfd-4621-9c09-0792a16e621f',
      created_at: '2023-10-24T17:16:41.344703+00:00',
      updated_at: '2023-10-24T17:16:40.727+00:00',
      data: {
        id: 6,
        name: 'Running Shoes',
        price: 79.99,
        category: 'Footwear',
        description:
          'Comfortable and stylish running shoes for active lifestyles.',
      },
      data_chunk: '',
      ai_table_name: 'test1',
      tokens: 36,
      embedding: [],
      formatted_data: '',
    },
    {
      id: 'd8b50f70-a20a-497e-9901-fab90cfd9578',
      created_at: '2023-10-24T17:16:41.344703+00:00',
      updated_at: '2023-10-24T17:16:40.727+00:00',
      data: {
        id: 9,
        name: 'Blender',
        price: 29.99,
        category: 'Kitchen Appliances',
        description: 'Powerful blender for making smoothies and more.',
      },
      data_chunk: '',
      ai_table_name: 'test1',
      tokens: 36,
      embedding: [],
      formatted_data: '',
    },
    {
      id: 'b56a7b38-3d1d-4436-95de-2135918817d7',
      created_at: '2023-10-24T17:16:41.344703+00:00',
      updated_at: '2023-10-24T17:16:40.727+00:00',
      data: {
        id: 4,
        name: 'Coffee Maker',
        price: 49.99,
        category: 'Kitchen Appliances',
        description: 'Automatic coffee maker for your morning brew.',
      },
      data_chunk: '',
      ai_table_name: 'test1',
      tokens: 35,
      embedding: [],
      formatted_data: '',
    },
    {
      id: '090cc6d4-6635-4c42-a24f-872544366534',
      created_at: '2023-10-24T17:16:41.344703+00:00',
      updated_at: '2023-10-24T17:16:40.727+00:00',
      data: {
        id: 8,
        name: 'Gaming Console',
        price: 299.99,
        category: 'Electronics',
        description:
          'Next-gen gaming console for immersive gaming experiences.',
      },
      data_chunk: '',
      ai_table_name: 'test1',
      tokens: 35,
      embedding: [],
      formatted_data: '',
    },
  ],
  [
    {
      id: 'f46f68e9-a834-43c1-96f8-7128fd275eba',
      created_at: '2023-10-24T17:16:41.344703+00:00',
      updated_at: '2023-10-24T17:16:40.727+00:00',
      data: {
        id: 5,
        name: 'Digital Camera',
        price: 499.99,
        category: 'Electronics',
        description: 'High-quality digital camera for photography enthusiasts.',
      },
      data_chunk: '',
      ai_table_name: 'test1',
      tokens: 34,
      embedding: [],
      formatted_data: '',
    },
    {
      id: 'bbc50af0-af76-4677-ab08-8c6fff625c95',
      created_at: '2023-10-24T17:16:41.344703+00:00',
      updated_at: '2023-10-24T17:16:40.727+00:00',
      data: {
        id: 7,
        name: 'Backpack',
        price: 39.99,
        category: 'Fashion',
        description: 'Stylish and functional backpack for everyday use.',
      },
      data_chunk: '',
      ai_table_name: 'test1',
      tokens: 34,
      embedding: [],
      formatted_data: '',
    },
    {
      id: 'a343d9f6-1a55-461e-a777-cc9a36a491fe',
      created_at: '2023-10-24T17:16:41.344703+00:00',
      updated_at: '2023-10-24T17:16:40.727+00:00',
      data: {
        id: 10,
        name: 'Ebook Reader',
        price: 129.99,
        category: 'Electronics',
        description: 'Lightweight ebook reader for avid readers.',
      },
      data_chunk: '',
      ai_table_name: 'test1',
      tokens: 34,
      embedding: [],
      formatted_data: '',
    },
    {
      id: '1ec42053-42fa-45fd-b476-9727e3ed441d',
      created_at: '2023-10-24T17:16:41.344703+00:00',
      updated_at: '2023-10-24T17:16:40.727+00:00',
      data: {
        id: 1,
        name: 'Laptop',
        price: 999.99,
        category: 'Electronics',
        description: 'Powerful laptop with high-performance specifications.',
      },
      data_chunk: '',
      ai_table_name: 'test1',
      tokens: 33,
      embedding: [],
      formatted_data: '',
    },
    {
      id: '8600554b-03dc-44b8-83ed-c3b0969b3bee',
      created_at: '2023-10-24T17:16:41.344703+00:00',
      updated_at: '2023-10-24T17:16:40.727+00:00',
      data: {
        id: 2,
        name: 'Smartphone',
        price: 699.99,
        category: 'Electronics',
        description: 'The latest smartphone with advanced features.',
      },
      data_chunk: '',
      ai_table_name: 'test1',
      tokens: 33,
      embedding: [],
      formatted_data: '',
    },
  ],
];

export const mockGroupedDataObjects: GroupedDataObject[] = [
  {
    ai_table_name: 'test',
    data: [
      {
        tokens: 33,
        ai_table_name: 'test',
        data: {
          ai_table_name: 'test',
          data: {
            id: 1,
            name: 'Laptop',
            category: 'Electronics',
            price: 999.99,
            description:
              'Powerful laptop with high-performance specifications.',
          },
        },
        formatted_data:
          'Id: 1\n\nName: Laptop\n\nCategory: Electronics\n\nPrice: 999.99\n\nDescription: Powerful laptop with high-performance specifications.',
        embedding: [],
        data_chunk: '',
      },
      {
        tokens: 33,
        ai_table_name: 'test',
        data: {
          ai_table_name: 'test',
          data: {
            id: 2,
            name: 'Smartphone',
            category: 'Electronics',
            price: 699.99,
            description: 'The latest smartphone with advanced features.',
          },
        },
        formatted_data:
          'Id: 2\n\nName: Smartphone\n\nCategory: Electronics\n\nPrice: 699.99\n\nDescription: The latest smartphone with advanced features.',
        embedding: [],
        data_chunk: '',
      },
    ],
  },
  {
    ai_table_name: 'test1',
    data: [
      {
        tokens: 36,
        ai_table_name: 'test1',
        data: {
          ai_table_name: 'test1',
          data: {
            id: 3,
            name: 'Headphones',
            category: 'Electronics',
            price: 99.99,
            description:
              'Noise-canceling headphones for immersive audio experience.',
          },
        },
        formatted_data:
          'Id: 3\n\nName: Headphones\n\nCategory: Electronics\n\nPrice: 99.99\n\nDescription: Noise-canceling headphones for immersive audio experience.',
        embedding: [],
        data_chunk: '',
      },
    ],
  },
  {
    ai_table_name: 'test2',
    data: [
      {
        tokens: 35,
        ai_table_name: 'test2',
        data: {
          ai_table_name: 'test2',
          data: {
            id: 4,
            name: 'Coffee Maker',
            category: 'Kitchen Appliances',
            price: 49.99,
            description: 'Automatic coffee maker for your morning brew.',
          },
        },
        formatted_data:
          'Id: 4\n\nName: Coffee Maker\n\nCategory: Kitchen Appliances\n\nPrice: 49.99\n\nDescription: Automatic coffee maker for your morning brew.',
        embedding: [],
        data_chunk: '',
      },
      {
        tokens: 34,
        ai_table_name: 'test2',
        data: {
          ai_table_name: 'test2',
          data: {
            id: 5,
            name: 'Digital Camera',
            category: 'Electronics',
            price: 499.99,
            description:
              'High-quality digital camera for photography enthusiasts.',
          },
        },
        formatted_data:
          'Id: 5\n\nName: Digital Camera\n\nCategory: Electronics\n\nPrice: 499.99\n\nDescription: High-quality digital camera for photography enthusiasts.',
        embedding: [],
        data_chunk: '',
      },
    ],
  },
  {
    ai_table_name: 'test4',
    data: [
      {
        tokens: 36,
        ai_table_name: 'test4',
        data: {
          ai_table_name: 'test4',
          data: {
            id: 6,
            name: 'Running Shoes',
            category: 'Footwear',
            price: 79.99,
            description:
              'Comfortable and stylish running shoes for active lifestyles.',
          },
        },
        formatted_data:
          'Id: 6\n\nName: Running Shoes\n\nCategory: Footwear\n\nPrice: 79.99\n\nDescription: Comfortable and stylish running shoes for active lifestyles.',
        embedding: [],
        data_chunk: '',
      },
    ],
  },
];

export const mockAssignedDataChunk: AssignedDataChunk = {
  formatted_data: `import {
    AIDBTableInsert,
    AddDataParams,
    SupabaseAIDBTable,
    SupabaseDBNames,
    SupabaseGetDataResponse,
    GroupedDataObject,
    DefaultClassParams,
    AssignedDataChunk,
  } from '@types';
  import { BaseClass } from '@utils/BaseClass';
  import { SupabaseConnection } from './SupabaseConnection';
  import { DataChunks } from './DataChunks';
  import { Data } from './Data';
  
  type DataManagerAddParams = {
    data: AddDataParams[];
    createAITableIfNotExists?: boolean;
  };
  
  export class DataManager extends BaseClass {
    private supabase = new SupabaseConnection(this.verbose);
    private dataChunks = new DataChunks({ verbose: this.verbose });
    private dataChunksTokensLimit = this.dataChunks.tokensLimit;
    private data = new Data({ verbose: this.verbose });
    private supabaseAITableName: SupabaseDBNames = 'ai_db_table';
    private totalUsage = 0;
    private totalCost = 0;
  
    constructor(params: DefaultClassParams) {
      super(params);
    }
  
    /**
     * @param data The data to extract the ai_table_name from
     * @param createAITableIfNotExists If true, create the ai_table_name if it does not exist
     * @description Checks if all the ai_table_name from the given data exists. If createAITableIfNotExists is true, create the ai_table_name if it does not exist.
     * @returns \`true\` if all the ai_table_name exists. Otherwise, throw an error.
     */
    public checkAITableNames = async (params: DataManagerAddParams) => {
      const { data, createAITableIfNotExists } = params;
      this.log(
        'add',
        \`Checking if all the ai_table_name from the given data exists...\`,
      );
      const aiTableNames = [...new Set(data.map((d) => d.ai_table_name))];
      const supabaseResponse: SupabaseGetDataResponse<SupabaseAIDBTable> =
        await this.supabase.getData({
          table_name: this.supabaseAITableName,
          ai_table_name: aiTableNames,
        });
  
      if (supabaseResponse.error) {
        const errorMsg = \`Error checking if all the ai_table_name from the given data exists.\n\n\${supabaseResponse.error}\`;
        throw new Error(errorMsg);
      }
  
      const nonExistingAITableNames = aiTableNames
        .filter(
          (aiTableName) =>
            !supabaseResponse.data?.find((t) => t.name === aiTableName),
        )
        .map((ai_table_name) => ({ ai_table_name }));
  
      if (nonExistingAITableNames.length) {
        // If createAITableIfNotExists is false, throw an error
        if (!createAITableIfNotExists) {
          throw new Error(
            \`The following AI table names do not exist: \${nonExistingAITableNames
              .map((c) => c.ai_table_name)
              .join(', ')}\`,
          );
        }
  
        // If createAITableIfNotExists is true, create the AI table names
        this.log(
          'add',
          \`Creating the following AI table names: \${nonExistingAITableNames
            .map((c) => c.ai_table_name)
            .join(', ')}\`,
        );
        const newAITableInsertData: AIDBTableInsert[] =
          nonExistingAITableNames.map((c) => ({
            name: c.ai_table_name,
          }));
  
        const newAITableSupabaseRequest = await this.supabase.insertData({
          table_name: this.supabaseAITableName,
          data: newAITableInsertData,
        });
  
        if (newAITableSupabaseRequest.error) {
          const errorMsg =
            newAITableSupabaseRequest.error.message ||
            \`Error creating the following AI table names: \${nonExistingAITableNames
              .map((c) => c.ai_table_name)
              .join(', ')}\`;
          throw new Error(errorMsg);
        }
      }
  
      return true;
    };
  
    public assignDataChunks = async (params: { data: GroupedDataObject[] }) => {
      const { data } = params;
      // 1. Get the data chunks based on the ai_table_name
      this.log(
        'assignDataChunks',
        \`Getting data chunks based on the ai_table_name...\`,
      );
      const aiTableNames = [...new Set(data.map((d) => d.ai_table_name))];
      const supabaseDataChunks = await this.dataChunks.get({
        ai_table_name: aiTableNames,
        tokensAscending: true,
      });
  
      if (supabaseDataChunks.error) {
        throw new Error(supabaseDataChunks.error);
      }
  
      // 2. Assign the data to the data chunks
      const existingDataChunks: AssignedDataChunk[] =
        supabaseDataChunks.data?.map((d) => ({
          data_chunk_id: d.id,
          ai_table_name: d.ai_table_name,
          data: [],
          tokens: d.tokens,
          formatted_data: d.formatted_data,
        })) || [];
  
      data.forEach((d) => {
        const { data: dataInserts } = d;
  
        dataInserts.forEach((dataInsert) => {
          let chunk = existingDataChunks.find(
            (chunk) =>
              chunk.ai_table_name === dataInsert.ai_table_name &&
              chunk.tokens + dataInsert.tokens <= this.dataChunksTokensLimit,
          );
  
          // If no suitable chunk is found, create a new one without chunk_id and formatted_data, representing a new data chunk
          if (!chunk) {
            const newDataChunk: AssignedDataChunk = {
              ai_table_name: dataInsert.ai_table_name,
              data: [],
              tokens: 0,
            };
  
            existingDataChunks.push(newDataChunk);
            chunk = newDataChunk;
          }
  
          // Add the formatted_data to the chunk
          chunk.formatted_data = \`\${chunk.formatted_data || ''}\${
            chunk.formatted_data ? '\n\n' : ''
          }\${dataInsert.formatted_data}\`;
  
          // Add the dataInsert to the chunk
          chunk.data.push(dataInsert);
  
          // Update the total token count for this chunk. And Add 2 tokens for the new line
          chunk.tokens += dataInsert.tokens + 2;
        });
      });
  
      return existingDataChunks.filter((d) => d.data.length);
    };
  
    public processAssignedDataChunks = async (params: {
      data: AssignedDataChunk[];
    }) => {
      const { data } = params;
      try {
        // 1. Filter existing and not existing data chunks
        const dataChunksUpdates = data.filter((d) => d.data_chunk_id);
        const newDataChunks = data.filter((d) => !d.data_chunk_id);
  
        // 2. Create new data chunks
  
        // return dataChunks;
      } catch (error: any) {
        this.log(
          'processAssignedDataChunks - Error',
          error.message || error,
          true,
        );
        throw new Error(error.message || error);
      }
    };
  
    /**
     * @param data The data to add and create data chunks from
     * @param createAITableIfNotExists If true, create the ai_table_name if it does not exist
     * @returns The data chunks
     */
    public add = async (params: DataManagerAddParams) => {
      const { data } = params;
  
      try {
        // 1. Check if all the ai_table_name exists
        await this.checkAITableNames(params);
  
        // 2. Create Data Objects
        const dataObjectsPromises = data.map(async (d) => {
          const { data, usage, cost } = await this.data.createDataObject(d);
          this.totalCost += cost;
          this.totalUsage += usage;
          return data;
        });
  
        this.log('add', \`Creating \${data.length} data objects...\`);
        const dataObjects = await Promise.all(dataObjectsPromises);
        this.log(
          'add',
          \`Created \${dataObjects.length} data objects.\n\nTotal Cost: \${this.totalCost}\nTotal Usage: \${this.totalUsage}\`,
        );
  
        // 3. Group Data Objects by ai_table_name
        const groupedDataObjects =
          this.data.groupDataObjectsByAiTableName(dataObjects);
  
        // 4. Assign Data Chunks
        const dataChunks = await this.assignDataChunks({
          data: groupedDataObjects,
        });
  
        return dataChunks;
      } catch (error: any) {
        this.log('add - Error', error.message || error, true);
        throw new Error(error.message || error);
      }
    };
  }`,
  ai_table_name: 'test',
  tokens: 1909,
  data: [],
};

export const mockSupabaseDataChunks: SupabaseDataChunk = {
  id: '86fc77d6-40e9-4c67-97f0-2d77b00e3ae7',
  created_at: '2023-11-03T16:05:09.608008+00:00',
  updated_at: '2023-11-03T16:05:08.614+00:00',
  formatted_data:
    "import {\n    AIDBTableInsert,\n    AddDataParams,\n    SupabaseAIDBTable,\n    SupabaseDBNames,\n    SupabaseGetDataResponse,\n    GroupedDataObject,\n    DefaultClassParams,\n    AssignedDataChunk,\n  } from '@types';\n  import { BaseClass } from '@utils/BaseClass';\n  import { SupabaseConnection } from './SupabaseConnection';\n  import { DataChunks } from './DataChunks';\n  import { Data } from './Data';\n  \n  type DataManagerAddParams = {\n    data: AddDataParams[];\n    createAITableIfNotExists?: boolean;\n  };\n  \n  export class DataManager extends BaseClass {\n    private supabase = new SupabaseConnection(this.verbose);\n    private dataChunks = new DataChunks({ verbose: this.verbose });\n    private dataChunksTokensLimit = this.dataChunks.tokensLimit;\n    private data = new Data({ verbose: this.verbose });\n    private supabaseAITableName: SupabaseDBNames = 'ai_db_table';\n    private totalUsage = 0;\n    private totalCost = 0;\n  \n    constructor(params: DefaultClassParams) {\n      super(params);\n    }\n  \n    /**\n     * @param data The data to extract the ai_table_name from\n     * @param createAITableIfNotExists If true, create the ai_table_name if it does not exist\n     * @description Checks if all the ai_table_name from the given data exists. If createAITableIfNotExists is true, create the ai_table_name if it does not exist.\n     * @returns `true` if all the ai_table_name exists. Otherwise, throw an error.\n     */\n    public checkAITableNames = async (params: DataManagerAddParams) => {\n      const { data, createAITableIfNotExists } = params;\n      this.log(\n        'add',\n        `Checking if all the ai_table_name from the given data exists...`,\n      );\n      const aiTableNames = [...new Set(data.map((d) => d.ai_table_name))];\n      const supabaseResponse: SupabaseGetDataResponse<SupabaseAIDBTable> =\n        await this.supabase.getData({\n          table_name: this.supabaseAITableName,\n          ai_table_name: aiTableNames,\n        });\n  \n      if (supabaseResponse.error) {\n        const errorMsg = `Error checking if all the ai_table_name from the given data exists.\n\n${supabaseResponse.error}`;\n        throw new Error(errorMsg);\n      }\n  \n      const nonExistingAITableNames = aiTableNames\n        .filter(\n          (aiTableName) =>\n            !supabaseResponse.data?.find((t) => t.name === aiTableName),\n        )\n        .map((ai_table_name) => ({ ai_table_name }));\n  \n      if (nonExistingAITableNames.length) {\n        // If createAITableIfNotExists is false, throw an error\n        if (!createAITableIfNotExists) {\n          throw new Error(\n            `The following AI table names do not exist: ${nonExistingAITableNames\n              .map((c) => c.ai_table_name)\n              .join(', ')}`,\n          );\n        }\n  \n        // If createAITableIfNotExists is true, create the AI table names\n        this.log(\n          'add',\n          `Creating the following AI table names: ${nonExistingAITableNames\n            .map((c) => c.ai_table_name)\n            .join(', ')}`,\n        );\n        const newAITableInsertData: AIDBTableInsert[] =\n          nonExistingAITableNames.map((c) => ({\n            name: c.ai_table_name,\n          }));\n  \n        const newAITableSupabaseRequest = await this.supabase.insertData({\n          table_name: this.supabaseAITableName,\n          data: newAITableInsertData,\n        });\n  \n        if (newAITableSupabaseRequest.error) {\n          const errorMsg =\n            newAITableSupabaseRequest.error.message ||\n            `Error creating the following AI table names: ${nonExistingAITableNames\n              .map((c) => c.ai_table_name)\n              .join(', ')}`;\n          throw new Error(errorMsg);\n        }\n      }\n  \n      return true;\n    };\n  \n    public assignDataChunks = async (params: { data: GroupedDataObject[] }) => {\n      const { data } = params;\n      // 1. Get the data chunks based on the ai_table_name\n      this.log(\n        'assignDataChunks',\n        `Getting data chunks based on the ai_table_name...`,\n      );\n      const aiTableNames = [...new Set(data.map((d) => d.ai_table_name))];\n      const supabaseDataChunks = await this.dataChunks.get({\n        ai_table_name: aiTableNames,\n        tokensAscending: true,\n      });\n  \n      if (supabaseDataChunks.error) {\n        throw new Error(supabaseDataChunks.error);\n      }\n  \n      // 2. Assign the data to the data chunks\n      const existingDataChunks: AssignedDataChunk[] =\n        supabaseDataChunks.data?.map((d) => ({\n          data_chunk_id: d.id,\n          ai_table_name: d.ai_table_name,\n          data: [],\n          tokens: d.tokens,\n          formatted_data: d.formatted_data,\n        })) || [];\n  \n      data.forEach((d) => {\n        const { data: dataInserts } = d;\n  \n        dataInserts.forEach((dataInsert) => {\n          let chunk = existingDataChunks.find(\n            (chunk) =>\n              chunk.ai_table_name === dataInsert.ai_table_name &&\n              chunk.tokens + dataInsert.tokens <= this.dataChunksTokensLimit,\n          );\n  \n          // If no suitable chunk is found, create a new one without chunk_id and formatted_data, representing a new data chunk\n          if (!chunk) {\n            const newDataChunk: AssignedDataChunk = {\n              ai_table_name: dataInsert.ai_table_name,\n              data: [],\n              tokens: 0,\n            };\n  \n            existingDataChunks.push(newDataChunk);\n            chunk = newDataChunk;\n          }\n  \n          // Add the formatted_data to the chunk\n          chunk.formatted_data = `${chunk.formatted_data || ''}${\n            chunk.formatted_data ? '\n\n' : ''\n          }${dataInsert.formatted_data}`;\n  \n          // Add the dataInsert to the chunk\n          chunk.data.push(dataInsert);\n  \n          // Update the total token count for this chunk. And Add 2 tokens for the new line\n          chunk.tokens += dataInsert.tokens + 2;\n        });\n      });\n  \n      return existingDataChunks.filter((d) => d.data.length);\n    };\n  \n    public processAssignedDataChunks = async (params: {\n      data: AssignedDataChunk[];\n    }) => {\n      const { data } = params;\n      try {\n        // 1. Filter existing and not existing data chunks\n        const dataChunksUpdates = data.filter((d) => d.data_chunk_id);\n        const newDataChunks = data.filter((d) => !d.data_chunk_id);\n  \n        // 2. Create new data chunks\n  \n        // return dataChunks;\n      } catch (error: any) {\n        this.log(\n          'processAssignedDataChunks - Error',\n          error.message || error,\n          true,\n        );\n        throw new Error(error.message || error);\n      }\n    };\n  \n    /**\n     * @param data The data to add and create data chunks from\n     * @param createAITableIfNotExists If true, create the ai_table_name if it does not exist\n     * @returns The data chunks\n     */\n    public add = async (params: DataManagerAddParams) => {\n      const { data } = params;\n  \n      try {\n        // 1. Check if all the ai_table_name exists\n        await this.checkAITableNames(params);\n  \n        // 2. Create Data Objects\n        const dataObjectsPromises = data.map(async (d) => {\n          const { data, usage, cost } = await this.data.createDataObject(d);\n          this.totalCost += cost;\n          this.totalUsage += usage;\n          return data;\n        });\n  \n        this.log('add', `Creating ${data.length} data objects...`);\n        const dataObjects = await Promise.all(dataObjectsPromises);\n        this.log(\n          'add',\n          `Created ${dataObjects.length} data objects.\n\nTotal Cost: ${this.totalCost}\nTotal Usage: ${this.totalUsage}`,\n        );\n  \n        // 3. Group Data Objects by ai_table_name\n        const groupedDataObjects =\n          this.data.groupDataObjectsByAiTableName(dataObjects);\n  \n        // 4. Assign Data Chunks\n        const dataChunks = await this.assignDataChunks({\n          data: groupedDataObjects,\n        });\n  \n        return dataChunks;\n      } catch (error: any) {\n        this.log('add - Error', error.message || error, true);\n        throw new Error(error.message || error);\n      }\n    };\n  }",
  summary:
    "Title: Summary of DataManager Class\n\n- The DataManager class is a class that manages data and data chunks.\n- It has properties such as supabase, dataChunks, dataChunksTokensLimit, data, supabaseAITableName, totalUsage, and totalCost.\n- The class has methods like checkAITableNames, assignDataChunks, processAssignedDataChunks, and add.\n- The checkAITableNames method checks if all the ai_table_name from the given data exists and creates them if they don't exist.\n- The assignDataChunks method gets data chunks based on the ai_table_name and assigns data to the data chunks.\n- The processAssignedDataChunks method filters existing and not existing data chunks and creates new data chunks.\n- The add method adds data and creates data chunks from it. It also checks if the ai_table_name exists and groups data objects by ai_table_name.",
  ai_table_name: 'test',
  tokens: 1909,
};
