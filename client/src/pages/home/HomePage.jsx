import styles from './HomePage.module.css';

import React from "react";
import { useMemo } from 'react';

import { Navbar, 
        NavbarBrand, 
        NavbarContent, 
        NavbarItem, 

        Select,
        SelectItem,

        Autocomplete, 
        AutocompleteItem,
        
        Link, 
        Button, 
        
        Image } from '@nextui-org/react'

import PostSearchResultsScrollable from './post_search_results_scrollable/PostSearchResultsScrollable';

import ScrollablePostItem from './post_search_results_scrollable/ScrollablePostItem';

import SearchBar from '../../base/search/SearchBar';


import Favicon from '../../assets/favicon.jpg';


import useGetPosts from '../../hooks/useGetPosts';
import useSearchSimilarPosts from '../../hooks/useSearchSimilarPosts';


export default function HomePage() {

    const [selectedPost, setSelectedPost] = React.useState(1); // index 1 is the default post
    const similarPosts = useSearchSimilarPosts(selectedPost); // Using the hook here

    const posts = useGetPosts();

    /*
    try {
        const sess = new onnx.InferenceSession();

        console.log(`onnx session created...`)
        //await sess.loadModel("../models/encoder_L12_float16.onnx");
        const loadingModelPromise = sess.loadModel("../../../models/onnx_model.onnx");
    
        console.log(`model loaded`);
    } catch (e) {
        console.log(`error loading ONNX model: ${e}`);
    }

    */

    const example_post_data = {
        "_id": "65b76d7c9188afb0c1f2a8a2",
        "index": 1,
        "__v": 0,
        "author": "Antonio",
        "description": "⚙️🌐 Optimizing Energy Consumption in Milk Evaporators using In-Silico Models 🥛💡\n\nIn today's food industry, manufacturing processes share commonalities with Pharma and Biotechnology, allowing the application of similar Digital Models. Evaporation units, crucial for concentrating milk and reducing energy needs in subsequent spray drying, exemplify this versatility.\n\n🌡 This study by Artemis Tsochatzidi, Achilleas Arvanitidis and Michael Georgiadis delves into the optimization of the evaporation process, exploring five different layouts through global system analysis (GSA) and advanced optimization techniques.\n\nKey Highlights:\n⚙️ MVR and TVR Technologies: Investigated Mechanical Vapor Recompression (MVR) and Thermal Vapor Recompression as primary energy-saving technologies.\n📈 Pressure and Ratio Impact: Explored the effects of higher TVR pressures, MVR ratios, and increased feed temperatures on evaporation and operational costs.\n💰 Economical Configurations: Identified cost-effective setups for different product dry mass contents using TVR and MVR.\n📊 Cost Sensitivity: Analyzed the impact of electricity prices, steam costs, and product transitions on overall costs.\n🌿 Biomass-Based Steam: Explored the significant impact of reductions in biomass-based steam costs on annual expenditures.\n📉 Total Annualized Cost: Implemented optimization strategies for new plant designs, resulting in substantial cost reductions.\n\n📚 Link to Publication: https://lnkd.in/dKfV33MP\n\n#EnergyOptimization #MilkEvaporators #DynamicOptimization #ResearchHighlight #PolyModelsHub",
        "embedding": [
            -0.05315915122628212,
            -0.010097313672304153,
            -0.013919573277235031,
            0.02045222371816635,
            0.052884336560964584,
            -0.06697996705770493,
            -0.04772331193089485,
            0.031026583164930344,
            0.04833972081542015,
            -0.03644966334104538,
            -0.03578851372003555,
            -0.030697477981448174,
            -0.03453421592712402,
            -0.06007804721593857,
            -0.022575564682483673,
            -0.09555687755346298,
            0.04598463699221611,
            0.07075788080692291,
            -0.1141728013753891,
            -0.07676009833812714,
            0.060613300651311874,
            -0.08679740875959396,
            -0.04423963651061058,
            0.06715961545705795,
            0.0782935619354248,
            -0.036548156291246414,
            -0.013464444316923618,
            0.011858045123517513,
            -0.040641188621520996,
            -0.0011598371202126145,
            -0.04236886650323868,
            -0.02371518686413765,
            0.0027599416207522154,
            -0.007517267018556595,
            0.0335988849401474,
            0.04608381539583206,
            0.043272171169519424,
            -0.03595013543963432,
            0.010391256771981716,
            0.020909791812300682,
            -0.02164170891046524,
            -0.04621134325861931,
            -0.0013911081477999687,
            0.04054060950875282,
            -0.024565601721405983,
            0.06604678928852081,
            -0.06898555904626846,
            0.04449555650353432,
            -0.07416168600320816,
            -0.002423563040792942,
            -0.016216229647397995,
            -0.002000644104555249,
            -0.012156627140939236,
            -0.01960267499089241,
            -0.052181895822286606,
            -0.05224011465907097,
            0.030817633494734764,
            -0.00016813080583233386,
            -0.02759997732937336,
            0.058447595685720444,
            0.01950087584555149,
            -0.020037775859236717,
            -0.017116015776991844,
            -0.025188829749822617,
            -0.014376972801983356,
            -0.01581464521586895,
            0.021661298349499702,
            0.0025109818670898676,
            -0.02247929386794567,
            -0.06441721320152283,
            -0.01927495002746582,
            0.018535811454057693,
            -0.01888185925781727,
            -0.037940748035907745,
            -0.06921395659446716,
            -0.005868597887456417,
            0.10956145077943802,
            0.06105485558509827,
            0.07123690098524094,
            0.043712589889764786,
            0.11904784291982651,
            0.0632559061050415,
            -0.041819918900728226,
            -0.04719863831996918,
            -0.07161690294742584,
            -0.018439602106809616,
            0.006648469250649214,
            -0.02186952345073223,
            0.17189481854438782,
            -0.054449938237667084,
            0.004232645034790039,
            0.04668169468641281,
            -0.007874740287661552,
            -0.003231767797842622,
            0.03246178850531578,
            0.06494830548763275,
            0.0037870295345783234,
            0.003693005768582225,
            0.028137357905507088,
            -0.06966535747051239,
            -0.08345511555671692,
            -0.024314770475029945,
            0.01444491557776928,
            -0.03313100337982178,
            0.008449499495327473,
            -0.09027004987001419,
            -0.001253486261703074,
            0.01839328370988369,
            0.07126199454069138,
            0.05155020207166672,
            -0.03201280161738396,
            0.02647867053747177,
            0.02073320373892784,
            0.0009692638413980603,
            0.011318208649754524,
            -0.03763582184910774,
            -0.04460010305047035,
            -0.08386803418397903,
            0.026575207710266113,
            -0.00879114679992199,
            -0.035071492195129395,
            -0.03458263725042343,
            0.00896521471440792,
            0.015938255935907364,
            -0.0094996877014637,
            -0.0289622750133276,
            -0.0023554496001452208,
            4.9180931417137815e-33,
            -0.1135333999991417,
            -0.023734187707304955,
            0.04248363897204399,
            -0.0038557315710932016,
            -0.0024299705401062965,
            0.0018441403517499566,
            -0.004612036515027285,
            -0.004250149242579937,
            0.01627838797867298,
            -0.026237796992063522,
            -0.010129446163773537,
            -0.011831398122012615,
            -0.08847749978303909,
            0.07735011726617813,
            0.08709152787923813,
            -0.04265157878398895,
            0.10074509680271149,
            0.09785449504852295,
            0.021564703434705734,
            -0.00041031098226085305,
            -0.04630039632320404,
            0.006393458228558302,
            0.008254644460976124,
            -0.0008210043888539076,
            -0.029717661440372467,
            0.0543949156999588,
            0.05397297441959381,
            -0.08145520836114883,
            -0.0904480367898941,
            -0.01704566366970539,
            0.08329255133867264,
            -0.044359464198350906,
            -0.01691882498562336,
            0.008399338461458683,
            -0.0004158744413871318,
            -0.04525335878133774,
            -0.0069089666940271854,
            0.016711609438061714,
            0.0271472055464983,
            0.048263587057590485,
            -0.04480200260877609,
            0.09905992448329926,
            0.036912236362695694,
            -0.014510437846183777,
            -0.048811376094818115,
            0.02751605026423931,
            0.006242701783776283,
            0.005713007878512144,
            0.0019384115003049374,
            -0.07516668736934662,
            -0.047902561724185944,
            0.06147198751568794,
            -0.021218061447143555,
            0.022250134497880936,
            0.028961408883333206,
            -0.019657090306282043,
            0.015277208760380745,
            -0.05957016721367836,
            0.022365236654877663,
            -0.02025887556374073,
            -0.12652133405208588,
            0.059923287481069565,
            0.018507596105337143,
            -0.012093945406377316,
            0.04330120608210564,
            -0.08947589248418808,
            -0.022805947810411453,
            0.04314851015806198,
            0.019518190994858742,
            0.06450127810239792,
            -0.052576225250959396,
            -0.11071748286485672,
            0.055968232452869415,
            -0.02847747690975666,
            0.07224605977535248,
            -0.016105880960822105,
            0.03388897329568863,
            0.033774569630622864,
            -0.0805881917476654,
            -0.030378194525837898,
            -0.03662939369678497,
            0.06709329783916473,
            -0.04570714756846428,
            -0.020465664565563202,
            -0.10905149579048157,
            -0.13946416974067688,
            -0.04593650996685028,
            0.1215139701962471,
            0.014658295549452305,
            0.012762539088726044,
            0.0074171521700918674,
            0.029077308252453804,
            0.008008863776922226,
            0.008911865763366222,
            0.02680300921201706,
            -6.353239868295312e-33,
            0.10757026821374893,
            0.06387176364660263,
            0.0053716558031737804,
            -0.00649141613394022,
            0.015179258771240711,
            -0.055922940373420715,
            0.00035716494312509894,
            -0.037925053387880325,
            0.013118879869580269,
            -0.05918131396174431,
            -0.01868996024131775,
            -0.0059217652305960655,
            -0.05299453064799309,
            0.08279170095920563,
            -0.06238553300499916,
            0.12498664855957031,
            -0.01276132371276617,
            -0.029621846973896027,
            0.01176555547863245,
            -0.07407255470752716,
            -0.05724457651376724,
            0.07943561673164368,
            -0.0223531536757946,
            -0.037749920040369034,
            -0.07946347445249557,
            -0.0008694400894455612,
            -0.0023011481389403343,
            0.041746605187654495,
            -0.015337604098021984,
            -0.016635555773973465,
            -0.036161862313747406,
            -0.0016595133347436786,
            0.0011421727249398828,
            0.049760423600673676,
            -0.03384207561612129,
            0.020723866298794746,
            0.06079884618520737,
            0.012421208433806896,
            0.037685468792915344,
            -0.01836341619491577,
            0.1133762076497078,
            -0.023073961958289146,
            -0.04977710545063019,
            -0.04084443673491478,
            0.035327039659023285,
            0.03637659177184105,
            -0.021469075232744217,
            -0.12270019203424454,
            0.08299273252487183,
            0.020421957597136497,
            0.10254611819982529,
            -0.06680509448051453,
            -0.06381673365831375,
            -0.023647276684641838,
            -0.009925986640155315,
            -0.08103086799383163,
            0.04287848621606827,
            -0.018481304869055748,
            -0.05180572718381882,
            -0.023763716220855713,
            0.07635834813117981,
            0.031034542247653008,
            0.05250733345746994,
            -0.005267016123980284,
            -0.10597071051597595,
            0.04248734191060066,
            0.050646260380744934,
            -0.009980111382901669,
            0.10179997980594635,
            -0.08217746019363403,
            -0.028879111632704735,
            0.033640578389167786,
            0.11282394081354141,
            0.07137294113636017,
            -0.035838767886161804,
            0.0842539519071579,
            0.017738789319992065,
            -0.045988474041223526,
            -0.027082806453108788,
            0.012891205959022045,
            -0.08122709393501282,
            0.011459393426775932,
            -0.07054180651903152,
            -0.018616080284118652,
            0.04390206187963486,
            -0.03719028830528259,
            -0.004821252543479204,
            0.0016735140234231949,
            0.01414589025080204,
            0.09148567169904709,
            -0.05685633420944214,
            -0.08333920687437057,
            0.11993590742349625,
            0.1087048351764679,
            0.06085077300667763,
            -5.6127337444422665e-8,
            -0.04130959510803223,
            -0.0012151789851486683,
            0.08663973212242126,
            0.04033258929848671,
            -0.07532679289579391,
            0.0029132734052836895,
            0.01564565859735012,
            0.04856136813759804,
            0.06213882565498352,
            0.011837928555905819,
            -0.02599392645061016,
            0.06044483184814453,
            0.05459173023700714,
            0.08635613322257996,
            0.017353767529129982,
            -0.07671412825584412,
            0.031406644731760025,
            0.0061689093708992004,
            -0.012277776375412941,
            -0.003195796627551317,
            -0.0027004601433873177,
            0.009852276183664799,
            -0.04776810109615326,
            -0.09890247881412506,
            0.09042416512966156,
            -0.02922365628182888,
            0.00656707352027297,
            0.06527571380138397,
            0.013587298803031445,
            -0.009817020036280155,
            0.03624614700675011,
            0.036874476820230484,
            0.02564338780939579,
            0.021700982004404068,
            -0.002364346757531166,
            -0.006969106383621693,
            -0.08113584667444229,
            -0.04110540449619293,
            -0.008011077530682087,
            0.01326919998973608,
            -0.061634451150894165,
            -0.026743846014142036,
            -0.08339668810367584,
            -0.02740040421485901,
            0.047354113310575485,
            0.005555134266614914,
            -0.05702826753258705,
            -0.07591786980628967,
            -0.02885604090988636,
            0.12067918479442596,
            0.014631391502916813,
            -0.007133243605494499,
            0.05190834030508995,
            0.032580286264419556,
            0.05547222122550011,
            -0.03688304126262665,
            -0.023110348731279373,
            0.051825352013111115,
            0.0325341559946537,
            -0.06399072706699371,
            0.055438291281461716,
            -0.0660386011004448,
            -0.027583841234445572,
            -0.03946646675467491
        ],
        "githubURL": "NOT SPECIFIED",
        "linkedinURL": "NOT SPECIFIED",
        "title": "Optimizing Energy Consumption in Milk Evaporators using In-Silico Models"
    }

    return (
        <div className="dark text-foreground bg-background">
        <main className={styles.mainContainer}>
            <Navbar
                shouldHideOnScroll
                position="sticky">
                <NavbarBrand>
                    <Image src={Favicon} width={30} height={30} />
                </NavbarBrand>

                <NavbarContent >
                    <NavbarItem>
                        <Link 
                            href="/about"
                            aria-current="about"
                            color="foreground">
                            About
                        </Link>
                    </NavbarItem>

                    <NavbarItem isActive>
                        <Link 
                            href="/home"
                            aria-current="about">
                            Home
                        </Link>
                    </NavbarItem>
                    
                </NavbarContent>

                <NavbarContent justify="end">
                    <NavbarItem>
                    <Button as={Link} color="primary" href="/login" variant="flat">
                        Login
                    </Button>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>

            {/* App starts here */}
            <main className={styles.secondContainer}>
                <div>
                    <ScrollablePostItem 
                        index={example_post_data.index}
                        title={example_post_data.title}
                        description={example_post_data.description}
                        author={example_post_data.author}
                    />
                </div>
                <div className={styles.searchContainer}>
                    {/* 
                    <SearchBar 
                        value={font}
                        setValue={setFont}/>
                    */}
                    <Autocomplete 
                        label="Select a Post" 
                        selectedKeys={selectedPost}
                        className="max-w-xs"
                        onSelectionChange={setSelectedPost}
                    >
                        {posts.map((post) => (
                        <AutocompleteItem key={post.index} value={post.index}>
                            {post.index}
                        </AutocompleteItem>
                        ))}
                    </Autocomplete>

                </div>
                <div className={styles.resultsContainer}>

                    {/* 
                    <Button
                        
                        color="success"
                        auto
                        size="small"
                        variant="flat"
                        onClick={() => {
                            console.log("Selected Font:", selectedFont); // Log the new selection
                            const results = useSearchSimilarFonts(selectedFont, similarFonts, setSimilarFonts);
                            console.log("Similar Fonts:", results); // Log the new selection
                        }
                        }
                    >
                        Search for Similar Fonts
                    </Button>
                    */}

                    <h1>Results</h1>

                    <PostSearchResultsScrollable
                        searchResultsData={similarPosts}
                        />
                    


                </div>
                <div className={styles.fontMapContainer}>
                    {/*
                    <Image 
                        src={FontMapImage} 
                        
                        />
                    */}

                    {/*
                    <FontMap 
                        font={font}
                        setFont={setFont}/>
                    */}
                    
                </div>
                <div className={styles.carouselContainer}>

                </div>
                <div className={styles.canvasContainer}>
                    {/*
                        <TestONNXButton />
                    */}
                    
                </div>

                

            </main>

        </main>
      
    </div>
    );
}