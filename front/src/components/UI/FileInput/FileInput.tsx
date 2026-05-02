import {useRef, useState} from 'react';
import {Button, Grid, TextField} from '@mui/material';

interface Props {
    name: string;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<Props> = ({name, label, onChange}) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [filename, setFilename] = useState<string>('');

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFilename(e.target.files[0].name);
        } else  {
            setFilename('');
        }

        onChange(e);
    };

    const activateInput = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    return (
        <>
            <input
                style={{ display: 'none' }}
                type="file"
                name={name}
                ref={inputRef}
                onChange={onFileChange}
            />

            <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '1rem' }}>
                <Grid>
                    <TextField
                        label={label}
                        value={filename}
                        disabled
                        onClick={activateInput}
                    />
                </Grid>
                <Grid>
                    <Button type='button' variant='contained' onClick={activateInput} sx={{ bgcolor: '#000' }}>
                        Browse
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default FileInput;