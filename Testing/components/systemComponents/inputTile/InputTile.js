import { StyleSheet, View } from "react-native"
import { DisplayText } from "../../displayComponents/text"

export const InputTile = ({
    label
}) => {

    return(
        <View>
            <View>
                {label && (
                    <DisplayText>
                        {label}
                    </DisplayText>
                )}

                <View style={styles.addContainer}>

                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    addContainer: {
        borderWidth: 1,
        padding: 15
    }
})