const fs = require('fs'); // fs : module Node qui perme d'interragir avec le systeme de fichiers

function getDnaContent(){
    try {
        const dnaData = fs.readFileSync("adn.txt", "utf8"); //lire le fichier texte de façon synchrone 
        console.log("Fichier 'adn.txt' chargé avec succès !");  
        //console.log(dnaData);
              
        return dnaData.replace(/[^ATCG]/g, "") // dnaData est une string contenant le contenu du fichier adn.text 

      } catch (err) {
        console.error("Erreur lors de la lecture du fichier : ", err);        
        return null
      }
    }
    


// PARTIE A - PROTEINES 
function getNucleotidesSequence(nucleotides, nucleotidesPerGroups) {
    const nucleotidesSequence = []

    for(let i = 0 ; i < nucleotides.length ; i += nucleotidesPerGroups){
        let nucleotidesGroup = nucleotides.slice(i, i + nucleotidesPerGroups)         // On extrait un groupe de x nombre caractères à chaque itération

        if (nucleotidesGroup.length === nucleotidesPerGroups) {
        nucleotidesSequence.push(nucleotidesGroup);                        // On push ces caractères dans le tableau de codons 
        }
    }    
    
    return nucleotidesSequence
}

const proteinesTable = {
'ATA':'I',
'ATC':'I',
'ATT':'I',
'ATG':'M',
'ACA':'T',
'ACC':'T',
'ACG':'T',
'ACT':'T',
'AAC':'N',
'AAT':'N',
'AAA':'K',
'AAG':'K',
'AGC':'S',
'AGT':'S',
'AGA':'R',
'AGG':'R',
'CTA':'L',
'CTC':'L',
'CTG':'L',
'CTT':'L',
'CCA':'P',
'CCC':'P',
'CCG':'P',
'CCT':'P',
'CAC':'H',
'CAT':'H',
'CAA':'Q',
'CAG':'Q',
'CGA':'R',
'CGC':'R',
'CGG':'R',
'CGT':'R',
'GTA':'V',
'GTC':'V',
'GTG':'V',
'GTT':'V',
'GCA':'A',
'GCC':'A',
'GCG':'A',
'GCT':'A',
'GAC':'D',
'GAT':'D',
'GAA':'E',
'GAG':'E',
'GGA':'G',
'GGC':'G',
'GGG':'G',
'GGT':'G',
'TCA':'S',
'TCC':'S',
'TCG':'S',
'TCT':'S',
'TTC':'F',
'TTT':'F',
'TTA':'L',
'TTG':'L',
'TAC':'Y',
'TAT':'Y',
'TAA':'_',
'TAG':'_',
'TGC':'C',
'TGT':'C',
'TGA':'_',
'TGG':'W',
}

function codonsToProteines(codons, proteinesTable) {
    let proteinesSequence = "" // on initialise une séquence de protéines vide

    for (const codon of codons) {
        if(proteinesTable[codon]){  // Si l'occurence existe, on ajout la traduction dans la séquence de protéines
            proteinesSequence += proteinesTable[codon]
        } else {
            proteinesSequence += "?"; // En cas de codon inconnu, il correspondra à un "?"
        }
    }
        
    return proteinesSequence
}

// PARTIE B - CONSENSUS 

function getNucleotidesOccurences(nucleotides){
    let nucleotidesOccurrences = {}
 
    for(let i = 0 ; i < nucleotides.length ; i+= 5) {
         console.log(nucleotides[i]);
        for (const nucleotide of nucleotides[i]) {         
            
            nucleotidesOccurrences[nucleotide] = (nucleotidesOccurrences[nucleotide] || 0) + 1;
            console.log(nucleotidesOccurrences);            
        }
    
    }

    console.log("Occurences de chaque nucléotide : ", nucleotidesOccurrences);

    return nucleotidesOccurences
}

/*****************************************************/
// EXECUTION DU CODE 
const nucleotidesSequence = getDnaContent()

const nucleotidesSample = "CTCTTGAACACTAGTTATCGAGCCAAATACCGATAGGTGCTTCTTTTGCGAGAATCTGATGAATCGTCCGCAGATTTTTT"

//Partie A 
// Etape 1 - on découpe 
const codonsSequence = getNucleotidesSequence(nucleotidesSequence, 3);
// console.log("Séquence de codons => ", codonsSequence);

// Étape 2 - on convertit
const proteinesSequence = codonsToProteines(codonsSequence, proteinesTable)
// console.log("Séquence de protéines => ", proteinesSequence);

// PARTIE B 
// Étape 1 - On découpe
const newNucleotidesSequence = getNucleotidesSequence(nucleotidesSample, 25)
console.log(newNucleotidesSequence);

// Etape 2 - On affine 
const nucleotidesPer5 = getNucleotidesSequence(nucleotidesSample, 5)
console.log(nucleotidesPer5);

// Etape 3 - On trouve les récurrences 
const nucleotidesOccurences = getNucleotidesOccurences(nucleotidesPer5)
console.log(nucleotidesOccurences);

