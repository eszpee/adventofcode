const input = //readInput("./day6.txt"); /*
// [
'dvgdvvbpbtbhbdhbhmmmcctmcmccggtrgghnhmnnqffpcprrqssnhsnhnshhsrsqqhchcdcfcqqcncrrzpppmzpzzhjzzzvrvnnpbpzzswzwswnngjgjgcjcfcllhffjbfjfhhppvnppfmfcmmcnnmnfnzfnzffphpnnnsvswvvnwnfntftjftfvvztzqzhzddttjpjbpphhlnnwgnwggdmmczclczzqddlcdldrlrccfflwwgqwwrjwrwzrrsdrrfssddcmmvrvlvhvfhfzhzbhbzzdmdvvsppwswmwdwjjzmzhhvghgthghvvtcthcttgsttpqpbbhthppzznntpnttshtshthhwrrgbbjzbjblblzbllcblcblbvvqfqqnjqqhfhftftwfftvvmddgzzmdzmdmtttttqmqmnqmqpmqpqqjlldpllfvlffjdfjjvlvjjjjbsjbjnnhmnhnrrwtrrfvvtppwmmpnnjbnjjcncjcttrcrjjlqjljccpzccvqvzzscctgccsmmnznhzhnnjggmjgmgjgtgtlgglhhrlhhrvhvrvtvvlvvwmmrjjzqqbzqqtgtzgttmgggwpgwgbwggwwprwwvswszznczncnccjnccjdjdjssqmmgcmcjmmhwhswhwdwrddtccmzmjmsmrmrddhrhhqbbspbsppqvqmvqmmclcddzjzvvslsffdhhqgqrqjrqjqjrrmpmrppcjpjffwhfwwppqvvzjzqqtftgfghgpglgnglldlvvwzwmmfzzhzmzhhswhhnvhvphpmphphrrwwfccmgmqgmmzgmgngznnzbzttjwttgngzzdndffwhfwhhlmllwqlwwgfgfpfnnldnldndbdcdddmbdmbbdpbpwbpptrrpggtrtrnttsmmcrmmlhltlgttblttbhttjzzvnnsbsqbqwbbtwtmtbbcjcljjslscswwglgqlgqgmmcpctcrttprpjjfvjfjqqljlvjljnnfhhfzhzmhmghhjnhjjbppmqqwlwswwgbbzszspzsppcscvvnhndhdwdmdrdssqrqdqsddnbnpplqppjbjdbdqdcccffsnntzntnmnlnbbrzzzvgvvqttbbzpbzpzdpdvppjmjpjbbdrbbgwgffzpzzjddmldlwwjdwwscwcfccnznmmfttvvmpmvpmvmcvmmjmwjwbbwqwjjzqjzjbbjqbjqqqthhsssmrsshvvprvvwccjlcctwwmgwgpwgpgcpptrppjppltlhthctttfptppwgpwprpbbqzbzznssfcsffbnnndffqmmqwmmpvvpvdppjqqttfpttjccbnbddvtdvddlsstjtccphchsswbbrqqgtqgqpqjqnjjvccwscwssjwjttqvtvmtmjjghghccpnpsplslmmfjfjtffgtgrtrftfhttpsttzzmhmllwqwhhnffdpffwbwnnbrrfbrrnjrjlljqqnjqnqqwlqqbbbtvvwgvgbgddpwdwvdwvdvvwzvwwtzwttppnttqccjtjrttqbbprpsrpssfjsffmdfmfbmbggjhggcjgcgvvjqqbhbllhrlhlclzzplpqqdtddrhhfssdvsvrrscsjjnwjjfpjfffcbfcfmmlpmphhhlpltptcpttppfssppgwppjgjnnblbhbtbrbgbpplnlvlsvlvwvwpptmtsswzswsnscsfcsfsfggzhghvvgbbfddgbbrmrtrqtthvhzhzthtbtjjcljjlcllzglzzdszdzjzjfzzzblbslbljjdnndvvnwnqnwqqscscmczcwwvrrlclttbtdtvddbrddvllnppvpmvmbbvfvttfcttggwgffrfwwwpwcpchppcrrgprgprgrjgjdgdgvddzndzdbzzswsvvtgtccrrnggbwggpjpnnsjjwfjjqfqvffrrhdrrsfrfjjfzfdzzqfqwbztszjqtttfdqvzmznzjlsjnwdthtwdtfslgdmgfpwsqcsqdhnsnsmghttfvlzqgspzdtlstdmthzftwmnqrznldpmwqbtthggjwcgjjmbpqgrnwspggjvrlcmtvpchmqhlwwtswqgpdjpbznqnssqhdjzgbjnfmgssrvnmmcvvhgmcvqbfdhgrhnqqzdmttmdzwgtprzqhplwnhhmlrvcbwpllqprtltdvqrwhvwzvlqsvfqsfjwmrnzlqpdgfpmtfdczqdnfjjbjmrdnffcmtwlzcmvnwmlpmqhvggdhptnzlvzwzwjbcszsnzgpwncfgvzfgbzwclvrbmllzpltzwjrftmppsfwhvvvhvqjtstnnczgtdbmpjjsscbdwplftgcgmtrnrnzplzhghrqgdtjwntwfstjwqjjrlhtwhnfqwfqgsjptjfpsrbnvvlgsltnvtfvscttwvrfzblzmfmnfrlrnzrrzhclggtntpjbbcphdvrfhnrtzvdmwbwgbftgzwlcqztghdhdmzwlmjbgptfnnzbmwsnzlzcpprqzmbbdsplmhpgmzthqcsfjcnfbfvsdsqzfvfcnpgqsvpgwsdbgjmsglrwmfjfpddczwvgdppfmrtszbtfdwbmlmzhqvvwmvlzvjfpffjnhwwhssfjnbzlqwqvjbjbhfntmhgswntdpbzlwwfbdbhrfhzfjsjbtlrqhlnrpfbwtpmrfvbhlmmsgtvcmrqmdpwvhqfqpgmfgnfrbvprhprtnpzjcnltndfsvjgndwblhwphtpsmnczgbtpwdvjsrctjbvbfslvslzlwbtstqvgcrqmfphwztpjqdmvcjpjqmjbdndfpzwsfwplchsmqwwbggptjdtztszmpfwgfwnqpdwfcpgrrhmfglsctjllflfltbcfvcpfcnqbwrvzmcmjpwptgsrlbrdchngwsdstfmcbrqvdsvvbnppdmnfwcgvpjjzqwcpvqfncvqlsfnjzprvhpgqscshqwsttdrsmqjfwlhcwlvnzvgvclqfjdgctvsrbwzflcldmrwlfhbgdtstqsqlblndnpgqlfbjzslcpcwvdwdffshhrzvhqwdsdmwtmtvcnrhmstvrnscppmbpmjbfjhljmsjnbjlhjhmnmcvvfgbdrblwbzrcctrjwjjwjtgnfjhhqbsmdjvdrdjtjbscfrsljnvqjlgjwqrvfmdttsvqjwdbswdtcfqsrpbvzrbsdqlqfjlrgcwzbqtqrpsrfcmbzcvjngcsmvqlbnghllcqcztbtvdrfcmpgfdprghsmbjvzbdnrdqnjdzslclgdsqglvpvcjpzqfwztlssljtmcdfcqdnqzwcttvpqfdpvzlhjfvvsgphgqrmzppvnjznqmdzfnfztjppstjfwddftcpcjnssznqbrvlvrzfhbvsjrwghttwlwfrptsvsrwfnvjtthwrppbngbgqvbsdgcrjcwjjljcwptrvgmbjpjtdbmhmzcfhzbsbrmzhdsrjbbmnwbsntpffdrrlgcrcgbcfwvlpmrzvsmvpjthtdjdvcspdsdvshlrwzcqnjmcnrgzbqzhfzbmtrvzzmjwbnjggtrtgcsnrmzbtjzgdmffdntspdhgnvgrmpbtnsspcqhsrvppjbrmdbggjbftnnbrgdsmdscqthdzflldfnplqccthpwccsfsnstttwztqnmnfshntqngmcndbsbftmgnhhwjvhchdfqzzgpdnfgvnjzjzfdzvsvtdqqcftrvmdcszcwpfrbcsmlqqfprrjgncwcvcngmrnwntcvzzlnwrhrznnldslhqdscbgsrqnvnmdtqvlttwqljmvbpbfldtbgzhvwzghnhwrwdqphhhgjpnmtlcmvfbdffnsvcswtmffzsrvczbntfpdsmwbqphvvcflpwgsrmjhrljlvzdgrcwpfphmvtwqwhjmrvmjzjlzlbflhzrdrzcdwhblpqwjljbvprddtvnccmchgctncwbpnmlqppfmhwchvjvpmblqhccfhlprdrczdfhmnsqhddbqlppgsnvhhfrwhqhfdpvsfcvzbqhgswtmnpmzrwsvnmztnqwdrhllssmgtzbztsprpsj';
//]; //*/

//iterate pointer over string
var pointer = 13;                             //backwards looking for easy result printing

while (true) {                                //i'm not proud
  var substr = input.substr(pointer-13,14);
  pointer++;                                  //increase now for easy result printing
  if (fourDifferent(substr)) {
    console.log('first part:',pointer);
    break;
  }
}


function fourDifferent(str) {
//takes four characters
//returns true if all different, otherwise false
  var chars = new Array();
  chars = str.split('');
  chars.sort();
  var alldifferent = true;
  for (i=1;i<chars.length;i++) {
    if (chars[i-1] === chars [i]) {
      alldifferent = false;
      break;
    }
  }
  return alldifferent;

}


function readInput(filename) {
  const fs = require('fs');

  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data.split(/\r?\n/);
  } catch (err) {
    console.error(err);
  }
}