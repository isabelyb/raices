import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categories } from 'src/entities/categories.entity';
import { Locations } from 'src/entities/locations.entity';
import { Legends } from 'src/entities/legends.entity';
import { User } from 'src/entities/users.entity';
import { CredentialsEntity } from 'src/entities/credential.entity';
import { Role } from 'src/enums/roles.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepo: Repository<Categories>,
    @InjectRepository(Locations)
    private readonly locationsRepo: Repository<Locations>,
    @InjectRepository(Legends)
    private readonly legendsRepo: Repository<Legends>,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    @InjectRepository(CredentialsEntity)
    private readonly credentialsRepo: Repository<CredentialsEntity>,
  ) {}

  async seed() {
    const categoriesCount = await this.categoriesRepo.count();
    if (categoriesCount > 0) {
      return {
        message: 'La base de datos ya tiene datos. Seed no ejecutado.',
      };
    }

    const categoriesData = [
      {
        name: 'Naturaleza y Medio Ambiente',
        description: 'Leyendas y mitos que involucran la protección de la naturaleza, los bosques, ríos y la relación ancestral con el medio ambiente.',
      },
      {
        name: 'Terror y Apariciones',
        description: 'Historias de espantos, criaturas aterradoras y apariciones nocturnas que han marcado la tradición oral colombiana.',
      },
      {
        name: 'Misterio y Sobrenatural',
        description: 'Relatos enigmáticos sobre seres místicos, fenómenos inexplicables y sucesos que desafían la lógica.',
      },
      {
        name: 'Mitos Muiscas',
        description: 'Mitos de origen de la cultura Muisca que explican la creación del mundo, fenómenos naturales y tradiciones sagradas.',
      },
      {
        name: 'Cultura e Historia Local',
        description: 'Leyendas urbanas y rurales que forman parte de la identidad cultural de regiones específicas de Colombia.',
      },
    ];

    const categories: Categories[] = [];
    for (const cat of categoriesData) {
      const category = this.categoriesRepo.create(cat);
      const saved = await this.categoriesRepo.save(category);
      categories.push(saved);
    }

    const locationsData = [
      {
        name: 'El Carmen de Viboral',
        department: 'Antioquia',
        touristInfo: 'Municipio del oriente antioqueño conocido por sus bosques húmedos, producción de café y cerámica artesanal. Sus paisajes montañosos están envueltos en neblina constante.',
      },
      {
        name: 'Cocorná',
        department: 'Antioquia',
        touristInfo: 'Municipio ubicado en la cordillera central antioqueña, caracterizado por sus densos bosques tropicales y clima húmedo. Reconocido por su biodiversidad.',
      },
      {
        name: 'Dabeiba',
        department: 'Antioquia',
        touristInfo: 'Municipio del occidente de Antioquia famoso por sus Cuevas del Mohán, formaciones rocosas y rica tradición folclórica indígena.',
      },
      {
        name: 'Caucasia',
        department: 'Antioquia',
        touristInfo: 'Ciudad del Bajo Cauca antioqueño, a orillas del río Cauca. Importante centro fluvial y comercial con tradición pesquera.',
      },
      {
        name: 'Amalfi',
        department: 'Antioquia',
        touristInfo: 'Municipio del nordeste antioqueño conocido por su historia minera, bosques montañosos y la legendaria historia del Tigre de Amalfi.',
      },
      {
        name: 'Cali',
        department: 'Valle del Cauca',
        touristInfo: 'Capital de la salsa y ciudad más importante del suroccidente colombiano. Conocida por sus cerros tutelares, feria de Cali y rica cultura afrocolombiana.',
      },
      {
        name: 'Guatavita',
        department: 'Cundinamarca',
        touristInfo: 'Municipio famoso por su laguna sagrada, origen de la leyenda de El Dorado. Pueblo colonial reconstruido con arquitectura típica y senderos ecológicos.',
      },
      {
        name: 'Chía',
        department: 'Cundinamarca',
        touristInfo: 'Municipio cercano a Bogotá, conocido por el Puente del Común (monumento nacional), zona comercial y gastronómica en crecimiento.',
      },
      {
        name: 'Turmequé',
        department: 'Boyacá',
        touristInfo: 'Municipio histórico del altiplano boyacense, cuna del cacique Diego de Torres. Importante sitio arqueológico muisca con arquitectura colonial.',
      },
      {
        name: 'Laguna de Iguaque',
        department: 'Boyacá',
        touristInfo: 'Santuario de fauna y flora ubicado en Villa de Leyva. Laguna sagrada origen del mito de Bachué, ideal para senderismo ecológico.',
      },
    ];

    const locations: Locations[] = [];
    for (const loc of locationsData) {
      const location = this.locationsRepo.create(loc);
      const saved = await this.locationsRepo.save(location);
      locations.push(saved);
    }

    const legendsData = [
      {
        title: 'La Madremonte',
        description: 'Espíritu protector de la naturaleza que habita en bosques y selvas, castigando a quienes dañan el medio ambiente.',
        story: 'Dicen los campesinos del oriente antioqueño que, cuando la neblina baja pesada como un manto y los árboles parecen susurrar entre sí, es porque la Madremonte camina. En los bosques húmedos de El Carmen de Viboral aparece una mujer gigantesca cubierta por una armadura viva de hojas, lianas y ramas. Sus ojos brillan como charcos iluminados por luciérnagas. Quien tala un árbol sin permiso, ensucia un río o caza más de lo necesario, siente un viento helado y escucha pasos pesados. La Madremonte golpea el suelo y el bosque se levanta en su defensa: raíces que atrapan, ramas que bloquean, sombras que confunden. Pero a los buenos campesinos los protege. La Madremonte castiga el abuso y premia el respeto.',
        origin: 'El Carmen de Viboral, oriente de Antioquia',
        imageUrl: 'https://res.cloudinary.com/doneq0an6/image/upload/v1763413058/Leyenda_Madre_Monte_qwziwo.jpg',
        category: categories[0],
        location: locations[0],
      },
      {
        title: 'La Patasola',
        description: 'Mujer atractiva que habita en la selva y atrae a hombres incautos para revelar su verdadera forma monstruosa de una sola pierna.',
        story: 'En los montes espesos de Cocorná, donde el bosque se vuelve tan oscuro que parece tragar la luz, se cuenta una historia que eriza la piel. La Patasola no siempre fue monstruo, dicen que fue una mujer hermosa maldita por traición. Ahora vaga con una sola pierna larga y musculosa como pata de bestia. Su rostro cambia: a veces angelical, a veces una máscara demoníaca. Los hombres que caminan solos escuchan primero una risa dulce, una voz que suplica ayuda. Cuando se acercan, la criatura revela su verdadera forma y corre con una sola pierna más rápido que cualquier animal. Quien la ve raramente vuelve a ser el mismo.',
        origin: 'Cocorná, cordillera central antioqueña',
        imageUrl: 'https://res.cloudinary.com/doneq0an6/image/upload/v1763413058/patasola_yr591z.jpg',
        category: categories[1],
        location: locations[1],
      },
      {
        title: 'El Cura sin Cabeza',
        description: 'Espectro de un sacerdote que perdió la cabeza y ronda los pueblos durante la noche como advertencia del pecado.',
        story: 'En las noches frías del norte antioqueño, cerca de San Andrés de Cuerquia, se escucha un campanazo que nadie toca. Hace más de un siglo un sacerdote cometió un pecado tan grave que fue condenado a vagar para siempre. Aparece vestido con sotana oscura, en sus manos una campana. Pero lo más aterrador es que no tiene cabeza. A veces la lleva bajo el brazo, otras veces solo hay un vacío profundo. Se detiene frente a casas donde hay personas actuando con mala intención. Su presencia es un aviso, un castigo silencioso. Si alguien intenta mirarlo directamente, la campana suena sola y la persona siente una presión en el pecho que muchos caen desmayados.',
        origin: 'Dabeiba, occidente de Antioquia',
        imageUrl: 'https://res.cloudinary.com/doneq0an6/image/upload/v1763413057/curasincabeza_mcczje.jpg',
        category: categories[2],
        location: locations[2],
      },
      {
        title: 'La Llorona',
        description: 'Mujer que perdió a sus hijos y vaga lamentándose junto a ríos buscando sus espíritus atrapados en el agua.',
        story: 'A orillas del río Cauca, donde la corriente se vuelve espejo de luna, se escucha un llanto que no pertenece a este mundo. Dicen que es La Llorona, llamada también La María Pardo. Una madre que perdió a sus hijos y ahora vaga buscando sus espíritus. La han visto caminar sobre la orilla con un vestido blanco arrastrado por el barro. Su cabello cae como sombra húmeda y su rostro nunca se ve hasta que alguien intenta acercarse. Solo entonces gira y su grito rompe el aire: ¡Ay, mis hiiiiijos! Pescadores de Caucasia aseguran que su llanto cambia el rumbo del río. Dicen que si te llama por tu nombre, puedes caer al agua sin darte cuenta y no volver jamás.',
        origin: 'Caucasia, riberas del río Cauca',
        imageUrl: 'https://res.cloudinary.com/doneq0an6/image/upload/v1763413058/llorona_dfanb4.png',
        category: categories[1],
        location: locations[3],
      },
      {
        title: 'El Mohán',
        description: 'Criatura mitológica que habita en ríos protegiendo los peces y castigando a quienes contaminan o pescan indiscriminadamente.',
        story: 'En las montañas de Dabeiba, donde los ríos nacen entre cuevas profundas, vive un ser más antiguo que los pueblos: El Mohán. Tiene forma de hombre gigantesco con piel tostada y melena de algas y raíces. Sus ojos son amarillos como dos soles bajo el agua. El Mohán gobierna las aguas, es dueño de los peces y secretos del río. Quien pesca más de lo debido o contamina, siente un remolino súbito y ve dos ojos amarillos desde el fondo. Los pescadores respetuosos aseguran que él los protege: les indica dónde están los peces, calma los rápidos. Es guardián, juez y espíritu ancestral que recuerda que las aguas tienen memoria.',
        origin: 'Dabeiba, vereda Cuevas del Mohán',
        imageUrl: 'https://res.cloudinary.com/doneq0an6/image/upload/v1763413058/ElMohan_rmn4pl.jpg',
        category: categories[2],
        location: locations[2],
      },
      {
        title: 'El Tigre de Amalfi',
        description: 'Historia real de un jaguar gigantesco que causó estragos en Amalfi en los años 40 y se convirtió en leyenda.',
        story: 'En 1949, en las montañas de Amalfi, comenzó el rumor de un animal gigantesco que atacaba ganado y dejaba huellas enormes. La gente lo llamó El Tigre de Amalfi, aunque era un jaguar. Por semanas nadie se atrevió a entrar al bosque. Los campesinos escuchaban gruñidos desde todas partes. Se volvió leyenda viva: algunos decían que tenía ojos rojos, otros que era inmune a balas, los viejos aseguraban que era un espíritu del monte. Finalmente cazadores lo enfrentaron. El jaguar era tan grande que varias personas tuvieron que moverlo. Su piel fue llevada al pueblo como símbolo de victoria, pero también como advertencia: la naturaleza puede ser más aterradora que el mito.',
        origin: 'Amalfi, nordeste de Antioquia',
        imageUrl: 'https://res.cloudinary.com/doneq0an6/image/upload/v1763413058/elTigre_p2mvke.png',
        category: categories[0],
        location: locations[4],
      },
      {
        title: 'Jovita Feijóo',
        description: 'Emblemática figura cultural de Cali que tras su trágica muerte se convirtió en símbolo de identidad caleña.',
        story: 'El nombre de Jovita Feijoo no pasa desapercibido. Siempre encabezando los desfiles de la feria de Cali, repartiendo besos y luciendo pintorescos trajes, Jovita se convirtió en algo tan típico como el Champús. Trágicamente murió el 15 de Julio de 1970. Ese día, dejó de ser aquella figura folclórica para convertirse en leyenda e identidad cultural caleña. Su alegría, carisma y amor por su ciudad la mantienen viva en la memoria colectiva como la Reina de reinas de la capital valluna.',
        origin: 'Cali, Valle del Cauca',
        imageUrl: 'https://res.cloudinary.com/doneq0an6/image/upload/v1763410659/Jovita_Feijo__Cali_Colombia_zkdv1x.jpg',
        category: categories[4],
        location: locations[5],
      },
      {
        title: 'El Monstruo de los Mangones',
        description: 'Leyenda urbana de un sádico que capturaba niños en terrenos baldíos de Cali.',
        story: 'La leyenda contaba que había un sádico que capturaba niños que no superaban los quince años, les sacaban la sangre y los dejaban tirados en los mangones, terrenos baldíos entre casas. Los niños aparecían en matorrales lejanos en condiciones deplorables. El Monstruo de los Mangones fue bautizado así por un periodista de El País y marcó a toda una generación. Fue un fenómeno que transgredió una simple denuncia de desaparición. Esta leyenda se usó como cuento para que los niños no salieran a la calle en las noches. Una verdad que hasta hoy no se ha descubierto.',
        origin: 'Cali, Valle del Cauca',
        imageUrl: 'https://res.cloudinary.com/doneq0an6/image/upload/v1763410659/El-monstruo-de-los-mangones-750x375_hy5x8r.jpg',
        category: categories[1],
        location: locations[5],
      },
      {
        title: 'El Ojo de Buziraco',
        description: 'Gigante murciélago demoniaco que habitaba el cerro de las Tres Cruces en Cali.',
        story: 'Dicen las leyendas que Buziraco, un gigante y tenebroso murciélago, era observado en las noches en la cumbre del cerro, rodeado de hombres y mujeres bailando al son de tambores. Atemorizados, los habitantes suplicaron ayuda. Desde Popayán fueron enviados misioneros que plantaron tres cruces de guadua para aplacar al demonio. Nunca volvió a ser visto, pero en 1925 un temblor derrumbó las cruces. Doce años después se instalaron tres cruces de concreto. Habitantes aseguran que Buziraco quedó sepultado bajo las cruces y que aún aprovecha la oscuridad para hacer de las suyas.',
        origin: 'Cali, Valle del Cauca',
        imageUrl: 'https://res.cloudinary.com/doneq0an6/image/upload/v1763410659/buziraco_wi2rwl.jpg',
        category: categories[2],
        location: locations[5],
      },
      {
        title: 'El Dorado y la Laguna de Guatavita',
        description: 'Mito de tesoro sagrado donde el cacique muisca se cubría de oro y arrojaba ofrendas a la laguna.',
        story: 'La leyenda cuenta que el cacique de Guatavita se cubrió el cuerpo con polvo de oro y arrojó tesoros al agua como ofrenda a los dioses. Según la versión cundiboyacense, cuando el cacique descubrió la infidelidad de su esposa, la cacica se lanzó con su hija a la laguna. Los muiscas creyeron que vivía en un palacio bajo el agua. Para pedir perdón, el cacique prometió ofrendas de oro. Cada nuevo gobernante era cubierto en oro, subía en balsa al centro de la laguna, se sumergía y lanzaban esmeraldas y oro. Los españoles transformaron esto en la leyenda de un reino entero hecho de oro.',
        origin: 'Guatavita, Cundinamarca',
        imageUrl: 'https://res.cloudinary.com/doneq0an6/image/upload/v1763413705/laguna-guatavita_hvfd70.webp',
        category: categories[3],
        location: locations[6],
      },
      {
        title: 'Bochica y el Salto del Tequendama',
        description: 'Mito muisca que explica la formación de la cascada cuando el sabio Bochica salvó a su pueblo de una inundación.',
        story: 'La sabana de Bacatá estuvo completamente inundada. Las lluvias no cesaban y el agua cubría casas y cultivos. Desesperados, los muiscas llamaron a Bochica, anciano de barba blanca. Bochica subió a las montañas y con un golpe de su bastón sobre la roca abrió una grieta gigantesca. Por allí comenzaron a salir las aguas con fuerza, formando la cascada del Salto del Tequendama. La sabana se desaguó y las tierras quedaron listas para la vida. El Salto del Tequendama tiene 157 metros de caída y para los muiscas era lugar sagrado, símbolo del poder de los dioses sobre el agua.',
        origin: 'Soacha, Cundinamarca',
        imageUrl: 'https://res.cloudinary.com/doneq0an6/image/upload/v1763413705/salto_rrcqou.jpg',
        category: categories[3],
        location: locations[7],
      },
      {
        title: 'El Diablo en el Puente del Común',
        description: 'Leyenda de pacto donde el diablo construyó un puente en una noche a cambio de un alma.',
        story: 'Florentino, maestro de obra sin dinero, hizo un pacto con el diablo: construiría el puente en una noche y si al cantar el gallo estaba terminado, se quedaría con su alma. Esa noche el diablo sacó diablos del infierno a trabajar sobre el río Bogotá. Cuando faltaba la última piedra, Florentino y un sacerdote bendijeron el puente con agua bendita. El diablo furioso se lanzó al río intentando destruirlo pero solo dejó la marca de su pata en una roca. Al no terminar antes del canto del gallo, perdió el derecho al alma. El Puente del Común es monumento nacional y patrimonio cultural construido en el siglo XVIII.',
        origin: 'Chía, Cundinamarca',
        imageUrl: 'https://res.cloudinary.com/doneq0an6/image/upload/v1763413706/Puente-del-Comun-Chia-Cundinamarca-Colombia_ckf7av.jpg',
        category: categories[4],
        location: locations[7],
      },
      {
        title: 'El Cacique Justiciero de Turmequé',
        description: 'Historia del cacique Diego de Torres que luchó contra los abusos coloniales usando el sistema legal español.',
        story: 'Diego de Torres, hijo de español y princesa muisca, heredó el cacicazgo de Turmequé. Al ver la brutal explotación de su pueblo decidió no quedarse callado. Optó por la vía legal desafiando autoridades corruptas. Su acto legendario fue viajar a España para presentar un Memorial de Agravios al Rey Felipe II. Detalló servicios excesivos, tributos injustos y maltrato sistemático. Sus denuncias le valieron persecución y encarcelamiento. Tuvo que huir de la justicia colonial convirtiéndose en héroe fugitivo que representaba la dignidad de los pueblos oprimidos. Se basó en hechos históricos reales del siglo XVI.',
        origin: 'Turmequé, Boyacá',
        imageUrl: 'https://res.cloudinary.com/doneq0an6/image/upload/v1763414075/turmeque_z7azwi.png',
        category: categories[4],
        location: locations[8],
      },
      {
        title: 'El Tunjo - Guardián de Oro Muisca',
        description: 'Figura sagrada de oro que se transforma en fantasma de niño custodiando tesoros y castigando la codicia.',
        story: 'El Tunjo aparece cerca de lugares sagrados indígenas, como lagunas o sepulturas, especialmente al atardecer. A veces se manifiesta como niño llorando, otras como pequeña figura brillante de oro. Si una persona avara intenta cogerlo para hacerse rica, el Tunjo la castiga: puede hacerla perderse, enloquecer o morir. Una versión cuenta que si se bautiza y se le dan ofrendas de semillas, se convierte en muñeco que defeca oro diariamente. Pero si el dueño falla en los cuidados, el Tunjo desata tormenta hasta recuperarse. Los Muiscas ofrendaban estas figuras en lagunas como rituales a los dioses.',
        origin: 'Laguna de Iguaque, Boyacá',
        imageUrl: 'https://res.cloudinary.com/doneq0an6/image/upload/v1763414075/guardianmuisca_urvbd3.png',
        category: categories[3],
        location: locations[9],
      },
      {
        title: 'Bachué - La Madre de la Humanidad',
        description: 'Mito de creación muisca donde la diosa Bachué emerge de la laguna de Iguaque y da origen al pueblo.',
        story: 'En el principio el mundo estaba deshabitado. De la laguna de Iguaque salió Bachué, hermosa mujer con un niño en brazos. El niño creció y se convirtieron en marido y mujer, tuvieron hijos que dieron origen al pueblo Muisca. Bachué enseñó a vivir en paz, cultivar la tierra y adorar a los dioses. Fue llamada Furachoque (mujer buena). Cuando la tierra estaba poblada, Bachué y su compañero se convirtieron en dos grandes serpientes y regresaron a la laguna para siempre. El pueblo le rindió culto en el santuario de Iguaque sabiendo que su madre era feliz.',
        origin: 'Laguna de Iguaque, Boyacá',
        imageUrl: 'https://res.cloudinary.com/doneq0an6/image/upload/v1763414073/bachue_o5daby.png',
        category: categories[3],
        location: locations[9],
      },
      {
        title: 'Sua y Chía - El Sol y la Luna Muiscas',
        description: 'Mito fundamental que explica la creación de la luz y el orden del universo muisca.',
        story: 'En los tiempos antiguos el universo estaba sumido en oscuridad fría. El dios Chiminigagua sintió necesidad de crear la luz para que el mundo floreciera. Ordenó que dos aves negras gigantes que llevaban luz en sus picos volaran por el universo. Al abrir sus picos esparcieron la luz disipando la penumbra. De esta luz surgieron Sua (el Sol, fuerza masculina, calor y luz del día) y Chía (la Luna, fuerza femenina, fertilidad y noche). Chiminigagua los puso en el cielo para que en ciclo constante iluminaran la tierra permitiendo que la vida prosperara y el pueblo midiera el tiempo y planificara cosechas.',
        origin: 'Boyacá - territorio Muisca',
        imageUrl: 'https://res.cloudinary.com/doneq0an6/image/upload/v1763414075/suaChia_rsfiin.png',
        category: categories[3],
        location: locations[9],
      },
      {
        title: 'Chibchacum - El Dios de los Terremotos',
        description: 'Mito que explica los sismos como castigo del dios Chibchacum condenado a cargar la Tierra.',
        story: 'Chibchacum era deidad asociada a comerciantes y castigo. En un acto de ira desató furia de las aguas provocando gran inundación en el valle amenazando ahogar a todos. El héroe Bochica intervino, drenó las aguas y salvó a la humanidad. Como castigo por su maldad, Bochica desterró a Chibchacum a las profundidades y lo obligó a vivir cargando la Tierra sobre sus hombros. Cada vez que se cansa de su pesada carga y se mueve o cambia el peso de un hombro al otro, la tierra tiembla y ocurren los sismos y terremotos que siente el pueblo boyacense y cundiboyacense.',
        origin: 'Boyacá - territorio Muisca',
        imageUrl: 'https://res.cloudinary.com/doneq0an6/image/upload/v1763414071/chibchacum_efemsu.png',
        category: categories[3],
        location: locations[8],
      },
      {
        title: 'El Mohán de Boyacá',
        description: 'Guardián seductor del río que protege las aguas y castiga a pescadores irrespetuosos.',
        story: 'El Mohán es figura emblemática del folclore colombiano, ser mitológico que habita profundidades de ríos y quebradas. Se describe como hombre corpulento de larga cabellera y ojos penetrantes. Vive en cuevas subacuáticas secretas en charcos profundos. Con las mujeres: acecha jóvenes que van a lavar o bañarse usando música de flauta para atraerlas, hipnotizarlas y raptarlas a su morada subacuática. Con pescadores: puede enredar redes, espantar peces o voltear canoas si no le dejan ofrendas de tabaco y aguardiente. Si se le trata con respeto asegura buena pesca. Es guardián celoso de ecosistemas que castiga a quienes contaminan o pescan en exceso.',
        origin: 'Ríos de Boyacá',
        imageUrl: 'https://res.cloudinary.com/doneq0an6/image/upload/v1763414073/mohan_scb1fx.png',
        category: categories[2],
        location: locations[8],
      },
    ];

    const legends: Legends[] = [];
    for (const leg of legendsData) {
      const legend = this.legendsRepo.create(leg);
      const saved = await this.legendsRepo.save(legend);
      legends.push(saved);
    }

    const adminUser = this.usersRepo.create({
      name: 'mitos',
      lastname: 'admin',
      email: 'admin@mitos.com',
      phone: '5555555',
      location: 'Bogota',
      isActive: true,
    });
    const savedAdmin = await this.usersRepo.save(adminUser);

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminCredentials = this.credentialsRepo.create({
      username: 'admin',
      password: hashedPassword,
      role: Role.ADMIN,
      isActive: true,
      user: savedAdmin,
    });
    await this.credentialsRepo.save(adminCredentials);

    return {
      message: 'Seed ejecutado exitosamente',
      data: {
        categories: categories.length,
        locations: locations.length,
        legends: legends.length,
        admin: 1,
      },
    };
  }
}

